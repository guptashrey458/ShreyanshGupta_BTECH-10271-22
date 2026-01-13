const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validate, authSchemas } = require('../middleware/validate');

// Public routes (no authentication required)
router.post('/signup', validate(authSchemas.signup), authController.signup);
router.post('/login', validate(authSchemas.login), authController.login);

// Protected routes (authentication required)
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, validate(authSchemas.updateProfile), authController.updateProfile);
router.delete('/profile', authMiddleware, authController.deleteProfile);

module.exports = router;