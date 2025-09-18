import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Test the database connection
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected via Prisma');
    
    // Test a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection test successful');
    
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error.message);
    process.exit(1);
  }
};

export default connectDB;
