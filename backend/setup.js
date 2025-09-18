import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { createUser } from './models/User.js';
import { createPortfolio } from './models/Portfolio.js';
import { createService } from './models/Service.js';
import { prisma } from './lib/prisma.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({ 
      where: { role: 'SUPERADMIN' } 
    });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return existingAdmin;
    }

    // Create admin user
    const adminUser = await createUser({
      name: 'Admin User',
      email: 'admin@srideviitpark.com',
      password: 'admin123456',
      role: 'SUPERADMIN',
      isActive: true
    });

    console.log('✅ Admin user created successfully');
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔑 Password: admin123456`);
    console.log(`👤 Role: ${adminUser.role}`);
    
    return adminUser;
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    throw error;
  }
};

const createSamplePortfolio = async () => {
  try {
    // Check if sample portfolio already exists
    const existingPortfolio = await prisma.portfolio.findFirst({ 
      where: { title: 'Sample Web Application' } 
    });
    if (existingPortfolio) {
      console.log('✅ Sample portfolio already exists');
      return;
    }

    // Create sample portfolio
    await createPortfolio({
      title: 'Sample Web Application',
      description: 'A modern web application built with React and Node.js, showcasing our development capabilities.',
      shortDescription: 'Modern web application with React and Node.js',
      category: 'WEB_DEVELOPMENT',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      thumbnail: '/uploads/sample-thumbnail.jpg',
      images: ['/uploads/sample-image1.jpg', '/uploads/sample-image2.jpg'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project',
      client: 'Sample Client',
      isFeatured: true,
      isActive: true,
      order: 1
    });

    console.log('✅ Sample portfolio created successfully');
  } catch (error) {
    console.error('❌ Error creating sample portfolio:', error.message);
  }
};

const createSampleServices = async () => {
  try {
    // Check if sample services already exist
    const existingServices = await prisma.service.count();
    if (existingServices > 0) {
      console.log('✅ Sample services already exist');
      return;
    }

    // Create sample services
    const services = [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies and best practices.',
        shortDescription: 'Custom web applications with modern tech',
        icon: '💻',
        category: 'DEVELOPMENT',
        features: ['Responsive Design', 'SEO Optimization', 'Performance', 'Security'],
        technologies: ['React', 'Vue.js', 'Node.js', 'Python', 'PHP'],
        pricing: 'CUSTOM',
        estimatedDuration: '4-12 weeks',
        isFeatured: true,
        isActive: true,
        order: 1
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interfaces that enhance user experience.',
        shortDescription: 'Beautiful and intuitive user interfaces',
        icon: '🎨',
        category: 'DESIGN',
        features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing'],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        pricing: 'HOURLY',
        estimatedDuration: '2-8 weeks',
        isFeatured: true,
        isActive: true,
        order: 2
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        shortDescription: 'Native and cross-platform mobile apps',
        icon: '📱',
        category: 'DEVELOPMENT',
        features: ['Native Performance', 'Cross-platform', 'App Store Publishing', 'Maintenance'],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        pricing: 'FIXED',
        estimatedDuration: '8-16 weeks',
        isFeatured: true,
        isActive: true,
        order: 3
      }
    ];

    for (const service of services) {
      await createService(service);
    }
    console.log('✅ Sample services created successfully');
  } catch (error) {
    console.error('❌ Error creating sample services:', error.message);
  }
};

const setupDatabase = async () => {
  try {
    console.log('🚀 Starting database setup...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Create admin user
    await createAdminUser();
    
    // Create sample data
    await createSamplePortfolio();
    await createSampleServices();
    
    console.log('🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Test the API: http://localhost:5000/health');
    console.log('3. Login with admin credentials');
    console.log('4. Update admin password for security');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
};

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase();
}

export default setupDatabase;
