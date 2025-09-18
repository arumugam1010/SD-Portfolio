import { prisma } from '../lib/prisma.js';

// Portfolio operations
export const createPortfolio = async (portfolioData) => {
  return await prisma.portfolio.create({
    data: portfolioData
  });
};

export const findPortfolioById = async (id) => {
  return await prisma.portfolio.findUnique({
    where: { id },
    include: {
      testimonials: true
    }
  });
};

export const findPortfolios = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 12, category, featured, search } = filters;
  
  // Build where clause
  const where = { isActive: true };
  if (category) where.category = category;
  if (featured === 'true') where.isFeatured = true;
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { technologies: { hasSome: [search] } }
    ];
  }

  const skip = (page - 1) * limit;
  
  const [projects, total] = await Promise.all([
    prisma.portfolio.findMany({
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
        category: true,
        technologies: true,
        images: true,
        thumbnail: true,
        liveUrl: true,
        githubUrl: true,
        client: true,
        startDate: true,
        endDate: true,
        isCompleted: true,
        isFeatured: true,
        order: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    prisma.portfolio.count({ where })
  ]);

  return {
    projects,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalProjects: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

export const updatePortfolio = async (id, updateData) => {
  return await prisma.portfolio.update({
    where: { id },
    data: updateData,
    include: {
      testimonials: true
    }
  });
};

export const deletePortfolio = async (id) => {
  return await prisma.portfolio.delete({
    where: { id }
  });
};

export const getPortfolioCategories = async () => {
  const categories = await prisma.portfolio.groupBy({
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

export const getFeaturedPortfolios = async () => {
  return await prisma.portfolio.findMany({
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
      category: true,
      technologies: true,
      images: true,
      thumbnail: true,
      liveUrl: true,
      githubUrl: true,
      client: true,
      startDate: true,
      endDate: true,
      isCompleted: true,
      order: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
