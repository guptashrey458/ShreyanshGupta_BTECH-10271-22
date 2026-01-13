const mongoose = require('mongoose');
const Task = require('../Task');
const User = require('../User');

describe('Task Model', () => {
  let testUser;

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
    // Clear collections and create test user
    await Task.deleteMany({});
    await User.deleteMany({});
    
    testUser = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });
    await testUser.save();
  });

  describe('Task Creation', () => {
    it('should create task with required fields', async () => {
      const taskData = {
        userId: testUser._id,
        title: 'Test Task',
        description: 'Test description',
        status: 'pending'
      };

      const task = new Task(taskData);
      await task.save();

      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('pending');
      expect(task.userId.toString()).toBe(testUser._id.toString());
      expect(task.created_at).toBeDefined();
    });

    it('should set default status to pending', async () => {
      const task = new Task({
        userId: testUser._id,
        title: 'Test Task'
      });
      await task.save();

      expect(task.status).toBe('pending');
    });

    it('should set created_at timestamp automatically', async () => {
      const beforeCreate = new Date();
      
      const task = new Task({
        userId: testUser._id,
        title: 'Test Task'
      });
      await task.save();

      const afterCreate = new Date();
      
      expect(task.created_at).toBeDefined();
      expect(task.created_at.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(task.created_at.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('Status Validation', () => {
    it('should accept valid status values', async () => {
      const validStatuses = ['pending', 'in-progress', 'completed'];
      
      for (const status of validStatuses) {
        const task = new Task({
          userId: testUser._id,
          title: `Test Task ${status}`,
          status: status
        });
        
        await expect(task.save()).resolves.toBeDefined();
        expect(task.status).toBe(status);
      }
    });

    it('should reject invalid status values', async () => {
      const task = new Task({
        userId: testUser._id,
        title: 'Test Task',
        status: 'invalid-status'
      });

      let error;
      try {
        await task.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.status).toBeDefined();
      expect(error.errors.status.message).toContain('pending, in-progress, completed');
    });
  });

  describe('Field Validation', () => {
    it('should require userId and title', async () => {
      const task = new Task({});
      
      let error;
      try {
        await task.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.userId).toBeDefined();
      expect(error.errors.title).toBeDefined();
    });

    it('should enforce title length limits', async () => {
      // Test title too long
      const longTitle = 'a'.repeat(101);
      const task = new Task({
        userId: testUser._id,
        title: longTitle
      });

      let error;
      try {
        await task.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.title.message).toContain('100 characters');
    });

    it('should enforce description length limits', async () => {
      const longDescription = 'a'.repeat(501);
      const task = new Task({
        userId: testUser._id,
        title: 'Test Task',
        description: longDescription
      });

      let error;
      try {
        await task.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.description.message).toContain('500 characters');
    });
  });

  describe('Instance Methods', () => {
    let task;

    beforeEach(async () => {
      task = new Task({
        userId: testUser._id,
        title: 'Test Task',
        status: 'pending'
      });
      await task.save();
    });

    it('should check if task belongs to user', () => {
      expect(task.belongsToUser(testUser._id)).toBe(true);
      
      const otherUserId = new mongoose.Types.ObjectId();
      expect(task.belongsToUser(otherUserId)).toBe(false);
    });

    it('should update status with validation', async () => {
      await task.updateStatus('in-progress');
      expect(task.status).toBe('in-progress');

      // Should throw error for invalid status
      await expect(task.updateStatus('invalid')).rejects.toThrow('Invalid status');
    });
  });
});