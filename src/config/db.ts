import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DATABASE;

    if (!mongoUri) {
      throw new Error('MONGO_URI not defined in .env');
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName, // explicitly choose which DB to use
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Using Database: ${conn.connection.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error: ${error.message}`);
    } else {
      console.error('❌ Unknown error occurred while connecting to MongoDB');
    }
    process.exit(1);
  }
};

export default connectDB;
