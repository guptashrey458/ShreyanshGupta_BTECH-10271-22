const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('./src/config/db');
const User = require('./src/models/User');
const Task = require('./src/models/Task');
const Board = require('./src/models/Board');

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB Connection...\n');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB successfully!\n');
    
    // Test creating a sample user
    console.log('👤 Testing User Creation...');
    const testUser = new User({
      email: 'test@kanban.com',
      password: 'password123',
      name: 'Test User',
      role: 'admin'
    });
    
    await testUser.save();
    console.log('✅ User created:', testUser.email);
    
    // Test creating a sample board
    console.log('\n📋 Testing Board Creation...');
    const testBoard = new Board({
      name: 'My First Kanban Board',
      description: 'Testing board creation',
      owner: testUser._id,
      columns: [
        { name: 'To Do', status: 'pending', position: 0 },
        { name: 'In Progress', status: 'in-progress', position: 1 },
        { name: 'Done', status: 'completed', position: 2 }
      ]
    });
    
    await testBoard.save();
    console.log('✅ Board created:', testBoard.name);
    
    // Test creating a sample task
    console.log('\n📝 Testing Task Creation...');
    const testTask = new Task({
      userId: testUser._id,
      boardId: testBoard._id,
      title: 'My First Task',
      description: 'Testing task creation with enhanced features',
      priority: 'high',
      category: 'Development',
      tags: ['test', 'setup'],
      estimatedHours: 2
    });
    
    await testTask.save();
    console.log('✅ Task created:', testTask.title);
    console.log('   Priority:', testTask.priority);
    console.log('   Category:', testTask.category);
    console.log('   Tags:', testTask.tags);
    
    // Query the data back
    console.log('\n🔍 Testing Data Retrieval...');
    const users = await User.find();
    const boards = await Board.find().populate('owner', 'name email');
    const tasks = await Task.find().populate('userId', 'name email');
    
    console.log(`✅ Found ${users.length} users`);
    console.log(`✅ Found ${boards.length} boards`);
    console.log(`✅ Found ${tasks.length} tasks`);
    
    console.log('\n🎉 All database operations successful!');
    console.log('\n📊 Database Collections Created:');
    console.log('   - users');
    console.log('   - boards'); 
    console.log('   - tasks');
    
    console.log('\n💡 You can now view these in MongoDB Compass!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await disconnectDB();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

testConnection();