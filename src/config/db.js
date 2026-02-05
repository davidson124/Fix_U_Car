import mongoose from 'mongoose';

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/FixUCarDb';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;