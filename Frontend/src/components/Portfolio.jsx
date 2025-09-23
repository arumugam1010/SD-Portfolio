import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Code, Zap, Utensils, QrCode, Receipt, CheckSquare, Package, ArrowRight, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Only manage visibility, not book view animation
      if (scrollY > 400 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    // Initial animation on mount - only manage visibility
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);



  const projects = [
    {
      id: 1,
      title: 'Smart Canteen System',
      description: 'Digital canteen management with cashless payments, menu management, and real-time analytics',
      image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'supabase', 'Payment Gateway'],
      link: '#',
      github: '#',
      category: 'Food Tech',
      icon: Utensils,
      details: {
        duration: '3 months',
        team: '5 developers',
        status: 'completed',
        features: [
          'Cashless payment system',
          'Real-time menu management',
          'Inventory tracking',
          'Analytics dashboard',
          'Mobile app for customers'
        ],
        challenges: [
          'Integration with multiple payment gateways',
          'Real-time synchronization across devices',
          'Handling high concurrent users'
        ],
        solutions: [
          'Implemented WebSocket for real-time updates',
          'Used Redis for caching and session management',
          'Microservices architecture for scalability'
        ],
        screenshots: [
          'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    },
    {
      id: 2,
      title: 'QR Visitor Management',
      description: 'Contactless visitor registration and tracking system with QR code generation and digital check-ins',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React','Node.js', 'QR Code API', 'supabase', ],
      link: '#',
      github: '#',
      category: 'Security',
      icon: QrCode,
      details: {
        duration: '4 months',
        team: '4 developers',
        status: 'in-progress',
        features: [
          'QR code generation',
          'Visitor registration',
          'Digital check-in/check-out',
          'Admin dashboard',
          'Email notifications'
        ],
        challenges: [
          'QR code security and encryption',
          'Offline functionality',
          'Integration with existing security systems'
        ],
        solutions: [
          'Implemented AES encryption for QR codes',
          'Used local storage for offline functionality',
          'RESTful API for system integration'
        ],
        screenshots: [
          'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    },
    {
      id: 3,
      title: 'Billing Application',
      description: 'A comprehensive React-based billing system with TypeScript, Vite, and Tailwind CSS, featuring secure authentication, dashboard analytics, shop and product management, billing interface, stock tracking, reports, and more.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React 18.3.1', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router DOM', 'Axios', 'Lucide React', 'QRCode.react', 'Vercel Analytics'],
      link: '#',
      github: '#',
      category: 'Finance',
      icon: Receipt,
      details: {
        duration: 'Ongoing',
        team: 'Development Team',
        status: 'in-progress',
        features: [
          'Authentication System: Secure login with JWT-based authentication, session timeout (1 hour), and automatic logout at 11 PM',
          'Dashboard: Central hub displaying key metrics, recent bills, top shops, top products, sales trends, and low stock alerts',
          'Shop Management: Interface to view, create, update, and delete shops, including contact details, GST numbers, and status management',
          'Product Management: Tools to manage product catalog with HSN codes, GST rates, pricing, and shop-specific pricing configurations',
          'Billing System: Comprehensive billing interface for creating bills, adding items, calculating totals, taxes (SGST/CGST), and managing pending payments',
          'Stock Management: Inventory tracking with quantity adjustments, low stock alerts, and rate management for products',
          'Reports and Analytics: Detailed reports on sales, revenue, product performance, and shop analytics with pagination and search',
          'Weekly Scheduling: Management of delivery schedules by day of the week, assigning shops to specific days',
          'Responsive Layout: Modern UI with navigation layout, icons from Lucide React, and mobile-friendly design',
          'QR Code Generation: Integration for generating QR codes (e.g., for GPay payments)',
          'Context-Based State Management: AppContext for sharing user data, authentication state, and other global states',
          'Analytics Integration: Vercel Analytics and Speed Insights for performance monitoring',
          'Search and Pagination: Efficient data handling with search functionality and paginated lists',
          'Error Handling and Loading States: User-friendly loading indicators and error messages',
          'Logo Integration: Displays the SriDeviSnacks logo (Logo.png) for branding'
        ],
        challenges: [
          'Implementing secure authentication and session management',
          'Handling complex tax calculations and billing logic',
          'Ensuring responsive design across devices',
          'Integrating various APIs for payments and analytics'
        ],
        solutions: [
          'Used JWT for secure authentication and implemented session timeouts',
          'Built modular components for tax and billing calculations',
          'Leveraged Tailwind CSS for responsive design',
          'Integrated Axios for API communication and QRCode.react for QR generation'
        ],
        screenshots: [
          'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
          '/Logo.png'
        ]
      }
    },
    {
      id: 4,
      title: 'Task Management System',
      description: 'Collaborative task management platform with real-time updates, progress tracking, and team collaboration',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'Supabase', ],
      link: '#',
      github: '#',
      category: 'Productivity',
      icon: CheckSquare,
      details: {
        duration: '6 months',
        team: '7 developers',
        status: 'in-progress',
        features: [
          'Real-time task updates',
          'Team collaboration tools',
          'Progress tracking',
          'File sharing',
          'Time tracking'
        ],
        challenges: [
          'Real-time synchronization',
          'Large team scalability',
          'File upload and management'
        ],
        solutions: [
          'WebSocket implementation for real-time updates',
          'Horizontal scaling with Redis clusters',
          'Cloud storage integration for files'
        ],
        screenshots: [
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    },
   
    {
      id: 5,
      title: 'School Management System',
      description: 'Comprehensive school management solution with student, teacher, and administrative modules',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      link: '#',
      github: '#',
      category: 'Education',
      icon: GraduationCap,
      details: {
        duration: '6 months',
        team: '4 developers',
        status: 'completed',
        features: [
          'Student registration and management',
          'Teacher portal and attendance',
          'Class and subject management',
          'Exam and result management',
          'Fee collection system',
          'Library management',
          'Transport management',
          'Admin dashboard'
        ],
        challenges: [
          'Complex database relationships',
          'Multi-user role management',
          'Data security and backup',
          'Report generation'
        ],
        solutions: [
          'Normalized MySQL database design',
          'Role-based access control (RBAC)',
          'Automated backup system',
          'PDF report generation with TCPDF'
        ],
        screenshots: [
          'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    }
  ];

  return (
    <>
      <section 
        id="portfolio" 
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 book-container ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Featured Projects</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Latest
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Creations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of innovative projects that showcase cutting-edge technology and creative solutions.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100 book-container block ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Removed hover overlay with Details and Code buttons as per user request */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                        <button 
                          onClick={() => handleViewProject(project)}
                          className="flex-1 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Details</span>
                        </button>
                        <a 
                          href={project.github}
                          className="flex-1 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center justify-center space-x-1"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div> */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/project/${project.id}`}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                     
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-500 book-container ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
              <span>View All Projects</span>
              <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </section>


    </>
  );
};

export default Portfolio;
