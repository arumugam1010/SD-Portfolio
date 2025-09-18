import { prisma } from '../lib/prisma.js';

// Service operations
export const createService = async (serviceData) => {
  return await prisma.service.create({
    data: serviceData
  });
};

export const findServiceById = async (id) => {
  return await prisma.service.findUnique({
    where: { id },
    include: {
      testimonials: true
    }
  });
};

export const findServices = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 10, category, featured } = filters;
  
  // Build where clause
  const where = { isActive: true };
  if (category) where.category = category;
  if (featured === 'true') where.isFeatured = true;

  const skip = (page - 1) * limit;
  
  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        description: true,
        shortDescription: true,
        icon: true,
        category: true,
        features: true,
        technologies: true,
        pricing: true,
        estimatedDuration: true,
        order: true,
        image: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    prisma.service.count({ where })
  ]);

  return {
    services,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalServices: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

export const updateService = async (id, updateData) => {
  return await prisma.service.update({
    where: { id },
    data: updateData,
    include: {
      testimonials: true
    }
  });
};

export const deleteService = async (id) => {
  return await prisma.service.delete({
    where: { id }
  });
};

export const getServiceCategories = async () => {
  const categories = await prisma.service.groupBy({
    by: ['category'],
    where: { isActive: true },
    _count: {
      category: true
    },
    orderBy: {
      _count: {
        category: 'desc'
      }
    }
  });

  return categories.map(cat => ({
    _id: cat.category,
    count: cat._count.category
  }));
};

export const getFeaturedServices = async () => {
  return await prisma.service.findMany({
    where: { 
      isFeatured: true, 
      isActive: true 
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ],
    take: 6,
    select: {
      id: true,
      title: true,
      description: true,
      shortDescription: true,
      icon: true,
      category: true,
      features: true,
      technologies: true,
      pricing: true,
      estimatedDuration: true,
      order: true,
      image: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
