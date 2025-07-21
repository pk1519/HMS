
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB();

const createAdminUser = async () => {
  try {
    const adminUser = new User({
      username: 'admin',
      password: 'password123', // In a real app, hash this password!
    });

    await adminUser.save();
    console.log('Admin user created!');
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdminUser();
