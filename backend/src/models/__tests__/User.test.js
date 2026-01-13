const mongoose = require('mongoose');
const User = require('../User');

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/kanban_test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Clean up and disconnect
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'plaintext123',
        name: 'Test User'
      };

      const user = new User(userData);
      await user.save();

      // Password should be hashed, not plain text
      expect(user.password).not.toBe('plaintext123');
      expect(user.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash pattern
    });

    it('should compare passwords correctly', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'plaintext123',
        name: 'Test User'
      };

      const user = new User(userData);
      await user.save();

      // Should return true for correct password
      const isMatch = await user.comparePassword('plaintext123');
      expect(isMatch).toBe(true);

      // Should return false for incorrect password
      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('Validation', () => {
    it('should require email, password, and name', async () => {
      const user = new User({});
      
      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
      expect(error.errors.name).toBeDefined();
    });

    it('should validate email format', async () => {
      const user = new User({
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      });

      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email.message).toContain('valid email');
    });

    it('should enforce minimum password length', async () => {
      const user = new User({
        email: 'test@example.com',
        password: '123', // Too short
        name: 'Test User'
      });

      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password.message).toContain('at least 6 characters');
    });
  });
});