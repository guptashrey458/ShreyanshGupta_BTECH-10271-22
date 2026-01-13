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
    index: true // Index for efficient user-specific queries
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Board ID is required'],
    index: true // Index for efficient board-specific queries
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
    index: true // Index for efficient status-based queries
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: 'Priority must be one of: low, medium, high, urgent'
    },
    default: 'medium'
  },
  category: {
    type: String,
    trim: true,
    maxlength: [30, 'Category cannot exceed 30 characters'],
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Can be assigned to another user
  },
  estimatedHours: {
    type: Number,
    min: [0, 'Estimated hours cannot be negative'],
    max: [1000, 'Estimated hours cannot exceed 1000']
  },
  actualHours: {
    type: Number,
    min: [0, 'Actual hours cannot be negative'],
    default: 0
  },
  completedAt: {
    type: Date,
    default: null
  },
  position: {
    type: Number,
    default: 0 // For drag-and-drop ordering within columns
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // Allow null/undefined dates, but if provided, should be valid
        return value === null || value === undefined || value instanceof Date;
      },
      message: 'Due date must be a valid date'
    }
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true // Prevent modification after creation
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: {
    transform: function(doc, ret) {
      // Remove __v from JSON output and ensure consistent date format
      delete ret.__v;
      
      // Convert ObjectId to string for cleaner API responses
      ret.id = ret._id.toString();
      delete ret._id;
      
      // Format dates consistently
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

/**
 * Compound index for efficient user + status queries
 * This supports queries like "get all pending tasks for user X"
 */
taskSchema.index({ userId: 1, status: 1 });

/**
 * Compound index for efficient board + status queries
 * This supports queries like "get all pending tasks for board X"
 */
taskSchema.index({ boardId: 1, status: 1 });

/**
 * Compound index for board + position queries (for drag-and-drop ordering)
 */
taskSchema.index({ boardId: 1, status: 1, position: 1 });

/**
 * Index for due date queries (e.g., overdue tasks, upcoming deadlines)
 */
taskSchema.index({ dueDate: 1 });

/**
 * Static method to find tasks by user ID
 * @param {string} userId - The user's ObjectId
 * @param {string} status - Optional status filter
 * @returns {Promise<Task[]>} Array of tasks
 */
taskSchema.statics.findByUser = function(userId, status = null) {
  const query = { userId };
  if (status) {
    query.status = status;
  }
  return this.find(query).sort({ created_at: -1 }); // Most recent first
};

/**
 * Static method to find tasks by user and status
 * @param {string} userId - The user's ObjectId
 * @param {string} status - Task status
 * @returns {Promise<Task[]>} Array of tasks matching criteria
 */
taskSchema.statics.findByUserAndStatus = function(userId, status) {
  return this.find({ userId, status }).sort({ created_at: -1 });
};

/**
 * Instance method to check if task belongs to a specific user
 * @param {string} userId - The user's ObjectId to check against
 * @returns {boolean} True if task belongs to user
 */
taskSchema.methods.belongsToUser = function(userId) {
  return this.userId.toString() === userId.toString();
};

/**
 * Instance method to update task status with validation
 * @param {string} newStatus - New status value
 * @returns {Promise<Task>} Updated task
 */
taskSchema.methods.updateStatus = function(newStatus) {
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(', ')}`);
  }
  
  this.status = newStatus;
  return this.save();
};

/**
 * Instance method to check if task is overdue
 * @returns {boolean} True if task has a due date and it's in the past
 */
taskSchema.methods.isOverdue = function() {
  if (!this.dueDate) return false;
  return new Date() > this.dueDate && this.status !== 'completed';
};

/**
 * Virtual property to get formatted due date
 */
taskSchema.virtual('formattedDueDate').get(function() {
  if (!this.dueDate) return null;
  return this.dueDate.toLocaleDateString();
});

/**
 * Pre-save middleware to validate status transitions
 * Ensures logical status progression (optional business rule)
 */
taskSchema.pre('save', function(next) {
  // If this is a new document, no validation needed
  if (this.isNew) {
    return next();
  }
  
  // Add any status transition validation logic here if needed
  // For now, we allow any status transitions
  next();
});

/**
 * Post-save middleware for logging (optional)
 */
taskSchema.post('save', function(doc) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Task ${doc._id} saved with status: ${doc.status}`);
  }
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;