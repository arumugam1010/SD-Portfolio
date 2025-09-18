import { prisma } from '../lib/prisma.js';

// Contact operations
export const createContact = async (contactData) => {
  return await prisma.contact.create({
    data: contactData
  });
};

export const findContactById = async (id) => {
  return await prisma.contact.findUnique({
    where: { id },
    include: {
      repliedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const findContacts = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 10, status, priority, search } = pagination;
  
  // Build where clause
  const where = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { subject: { contains: search, mode: 'insensitive' } },
      { message: { contains: search, mode: 'insensitive' } }
    ];
  }

  const skip = (page - 1) * limit;
  
  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        repliedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    }),
    prisma.contact.count({ where })
  ]);

  return {
    contacts,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

export const updateContact = async (id, updateData) => {
  return await prisma.contact.update({
    where: { id },
    data: updateData,
    include: {
      repliedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const deleteContact = async (id) => {
  return await prisma.contact.delete({
    where: { id }
  });
};

export const getContactStats = async () => {
  const stats = await prisma.contact.groupBy({
    by: ['status'],
    _count: {
      status: true
    }
  });

  const totalContacts = await prisma.contact.count();
  const newContacts = await prisma.contact.count({ where: { status: 'NEW' } });
  const readContacts = await prisma.contact.count({ where: { status: 'READ' } });
  const repliedContacts = await prisma.contact.count({ where: { status: 'REPLIED' } });

  return {
    total: totalContacts,
    new: newContacts,
    read: readContacts,
    replied: repliedContacts,
    breakdown: stats.map(stat => ({
      _id: stat.status,
      count: stat._count.status
    }))
  };
};
