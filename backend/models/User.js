import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// User utility functions
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const checkPasswordChangedAfter = (passwordChangedAt, JWTTimestamp) => {
  if (passwordChangedAt) {
    const changedTimestamp = parseInt(
      passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// User operations
export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  return await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  });
};

export const findUserByEmail = async (email, includePassword = false) => {
  return await prisma.user.findUnique({
    where: { email },
    select: includePassword ? undefined : {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const findUserById = async (id, includePassword = false) => {
  return await prisma.user.findUnique({
    where: { id },
    select: includePassword ? undefined : {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await hashPassword(updateData.password);
    updateData.passwordChangedAt = new Date();
  }
  
  return await prisma.user.update({
    where: { id },
    data: updateData
  });
};

export const updateUserLastLogin = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: { lastLogin: new Date() }
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
