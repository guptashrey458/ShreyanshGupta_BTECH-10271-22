const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
const { validate, taskSchemas } = require('../middleware/validate');

// All task routes require authentication
router.use(authMiddleware);

// Create a new task
router.post('/', validate(taskSchemas.createTask), taskController.createTask);

// Get all tasks for the authenticated user
router.get('/', taskController.getTasks);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Update a task
router.put('/:id', validate(taskSchemas.updateTask), taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
