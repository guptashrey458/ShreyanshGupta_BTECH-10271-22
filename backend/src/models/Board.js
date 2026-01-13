const mongoose = require('mongoose');

/**
 * Board Schema for organizing tasks into projects/boards
 * Enables multi-project Kanban management
 */
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Board name is required'],
    trim: true,
    maxlength: [100, 'Board name cannot exceed 100 characters'],
    minlength: [1, 'Board name cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Board owner is required'],
    index: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'editor'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color'],
    default: '#3B82F6' // Blue
  },
  columns: [{
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Column name cannot exceed 50 characters']
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'completed']
    },
    position: {
      type: Number,
      required: true
    },
    wipLimit: {
      type: Number,
      min: [0, 'WIP limit cannot be negative'],
      default: null // null means no limit
    }
  }],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    }
  }
});

// Indexes for efficient queries
boardSchema.index({ owner: 1 });
boardSchema.index({ 'members.user': 1 });
boardSchema.index({ isPublic: 1 });
boardSchema.index({ isArchived: 1 });

/**
 * Static method to find boards accessible by a user
 * @param {string} userId - User's ObjectId
 * @returns {Promise<Board[]>} Array of accessible boards
 */
boardSchema.statics.findAccessibleByUser = function(userId) {
  return this.find({
    $or: [
      { owner: userId },
      { 'members.user': userId },
      { isPublic: true }
    ],
    isArchived: false
  }).populate('owner', 'name email avatar')
    .populate('members.user', 'name email avatar');
};

/**
 * Instance method to check if user has access to board
 * @param {string} userId - User's ObjectId
 * @param {string} requiredRole - Minimum required role
 * @returns {boolean} True if user has access
 */
boardSchema.methods.hasAccess = function(userId, requiredRole = 'viewer') {
  const roleHierarchy = { viewer: 0, editor: 1, admin: 2 };
  
  // Owner has full access
  if (this.owner.toString() === userId.toString()) {
    return true;
  }
  
  // Check member access
  const member = this.members.find(m => m.user.toString() === userId.toString());
  if (member) {
    return roleHierarchy[member.role] >= roleHierarchy[requiredRole];
  }
  
  // Public boards allow viewer access
  return this.isPublic && requiredRole === 'viewer';
};

/**
 * Instance method to add member to board
 * @param {string} userId - User's ObjectId
 * @param {string} role - Member role
 * @returns {Promise<Board>} Updated board
 */
boardSchema.methods.addMember = function(userId, role = 'editor') {
  // Check if user is already a member
  const existingMember = this.members.find(m => m.user.toString() === userId.toString());
  if (existingMember) {
    existingMember.role = role;
  } else {
    this.members.push({ user: userId, role });
  }
  return this.save();
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;