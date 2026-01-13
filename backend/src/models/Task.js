const mongoose = require('mongoose');

/**
 * Task Schema with userId, title, description, status, and dueDate fields
 * Includes proper indexing and status enum validation
 */
const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    minlength: [1, 'Title cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: 'Status must be one of: pending, in-progress, completed'
    },
    default: 'pending',
    index: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      ret.id = ret._id.toString();
      delete ret._id;
      
      if (ret.dueDate) {
        ret.dueDate = ret.dueDate.toISOString();
      }
      if (ret.created_at) {
        ret.created_at = ret.created_at.toISOString();
      }
      if (ret.createdAt) {
        ret.createdAt = ret.createdAt.toISOString();
      }
      if (ret.updatedAt) {
        ret.updatedAt = ret.updatedAt.toISOString();
      }
      
      return ret;
    }
  }
});

// Compound index for efficient user + status queries
taskSchema.index({ userId: 1, status: 1 });

// Index for due date queries
taskSchema.index({ dueDate: 1 });

/**
 * Static method to find tasks by user ID
 */
taskSchema.statics.findByUser = function(userId, status = null) {
  const query = { userId };
  if (status) {
    query.status = status;
  }
  return this.find(query).sort({ created_at: -1 });
};

/**
 * Instance method to check if task belongs to a specific user
 */
taskSchema.methods.belongsToUser = function(userId) {
  return this.userId.toString() === userId.toString();
};

/**
 * Instance method to check if task is overdue
 */
taskSchema.methods.isOverdue = function() {
  if (!this.dueDate) return false;
  return new Date() > this.dueDate && this.status !== 'completed';
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
