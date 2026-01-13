const Joi = require('joi');

/**
 * Validation middleware factory
 * Creates middleware that validates request body against provided Joi schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all validation errors
      stripUnknown: true // Remove unknown fields
    });
    
    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details
      });
    }
    
    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

// Validation schemas for authentication endpoints
const authSchemas = {
  signup: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      }),
    name: Joi.string()
      .min(1)
      .max(50)
      .trim()
      .required()
      .messages({
        'string.min': 'Name cannot be empty',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required'
      })
  }),
  
  login: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),
  
  updateProfile: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .messages({
        'string.email': 'Please provide a valid email address'
      }),
    name: Joi.string()
      .min(1)
      .max(50)
      .trim()
      .messages({
        'string.min': 'Name cannot be empty',
        'string.max': 'Name cannot exceed 50 characters'
      }),
    password: Joi.string()
      .min(6)
      .messages({
        'string.min': 'Password must be at least 6 characters long'
      })
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  })
};

// Validation schemas for task endpoints
const taskSchemas = {
  createTask: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .trim()
      .required()
      .messages({
        'string.min': 'Title cannot be empty',
        'string.max': 'Title cannot exceed 100 characters',
        'any.required': 'Title is required'
      }),
    description: Joi.string()
      .max(500)
      .trim()
      .allow('')
      .default('')
      .messages({
        'string.max': 'Description cannot exceed 500 characters'
      }),
    status: Joi.string()
      .valid('pending', 'in-progress', 'completed')
      .default('pending')
      .messages({
        'any.only': 'Status must be one of: pending, in-progress, completed'
      }),
    dueDate: Joi.date()
      .iso()
      .allow(null)
      .messages({
        'date.format': 'Due date must be a valid ISO date'
      })
  }),
  
  updateTask: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .trim()
      .messages({
        'string.min': 'Title cannot be empty',
        'string.max': 'Title cannot exceed 100 characters'
      }),
    description: Joi.string()
      .max(500)
      .trim()
      .allow('')
      .messages({
        'string.max': 'Description cannot exceed 500 characters'
      }),
    status: Joi.string()
      .valid('pending', 'in-progress', 'completed')
      .messages({
        'any.only': 'Status must be one of: pending, in-progress, completed'
      }),
    dueDate: Joi.date()
      .iso()
      .allow(null)
      .messages({
        'date.format': 'Due date must be a valid ISO date'
      })
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  })
};

module.exports = {
  validate,
  authSchemas,
  taskSchemas
};