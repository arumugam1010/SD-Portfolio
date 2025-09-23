import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Users, Star, ArrowLeft, Code, Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.details.screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.details.screenshots.length) % project.details.screenshots.length);
  };

  // This would typically come from an API or context, but for now using the same data structure
  const projects = [
    {
      id: 1,
      title: 'Smart Canteen System',
      description: 'Digital canteen management with cashless payments, menu management, and real-time analytics',
      image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
      link: '#',
      github: '#',
      category: 'Food Tech',
      icon: () => <div>🍽️</div>, // Placeholder, you can import the actual icon
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
      technologies: ['React Native', 'QR Code API', 'Firebase', 'Cloud Functions'],
      link: '#',
      github: '#',
      category: 'Security',
      icon: () => <div>📱</div>,
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
      icon: () => <div>💰</div>,
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
      technologies: ['React', 'Socket.io', 'Redis', 'JWT Auth'],
      link: '#',
      github: '#',
      category: 'Productivity',
      icon: () => <div>✅</div>,
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
      icon: () => <div>🎓</div>,
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

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = project.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl">
              <IconComponent className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  project.details.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <Star className="w-4 h-4" />
                  <span className="capitalize">{project.details.status}</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{project.title}</h1>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="text-gray-900 font-semibold">Duration</span>
            </div>
            <p className="text-gray-600">{project.details.duration}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-gray-900 font-semibold">Team Size</span>
            </div>
            <p className="text-gray-600">{project.details.team}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <Code className="w-6 h-6 text-blue-600" />
              <span className="text-gray-900 font-semibold">Technologies</span>
            </div>
            <p className="text-gray-600">{project.technologies.length} technologies used</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.details.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Challenges & Solutions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Challenges & Solutions</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Challenges Faced:</h3>
                  <ul className="space-y-2">
                    {project.details.challenges.map((challenge, index) => (
                      <li key={index} className="text-gray-600 text-sm leading-relaxed">
                        • {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Solutions Implemented:</h3>
                  <ul className="space-y-2">
                    {project.details.solutions.map((solution, index) => (
                      <li key={index} className="text-gray-600 text-sm leading-relaxed">
                        • {solution}
                      </li>
                i    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Screenshots</h2>
              <div className="grid grid-cols-1 gap-4">
                {project.details.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    onClick={() => openModal(index)}
                    className="cursor-pointer"
                  >
                    <img
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.link}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
       
          </div>
        </div>
      </div>

      {/* Modal for Screenshots */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={project.details.screenshots[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {project.details.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
