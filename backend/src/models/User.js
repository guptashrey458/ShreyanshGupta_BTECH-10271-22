const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema with email, password, and name fields
 * Includes password hashing middleware and authentication methods
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
    minlength: [1, 'Name cannot be empty']
  },
  avatar: {
    type: String,
    default: null // URL to profile picture
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'manager'],
      message: 'Role must be one of: user, admin, manager'
    },
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: {
    transform: function(doc, ret) {
      // Remove password and __v from JSON output
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

/**
 * Pre-save middleware to hash password before saving to database
 * Only hashes if password is modified (new or changed)
 */
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Hash password with cost of 12
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method to compare provided password with hashed password
 * @param {string} candidatePassword - The password to compare
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // this.password is the hashed password from the database
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Static method to find user by email and include password for authentication
 * @param {string} email - User email
 * @returns {Promise<User|null>} User document with password field
 */
userSchema.statics.findByEmailWithPassword = function(email) {
  return this.findOne({ email }).select('+password');
};

/**
 * Instance method to get user profile without sensitive data
 * @returns {Object} User profile object
 */
userSchema.methods.getProfile = function() {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Create indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;