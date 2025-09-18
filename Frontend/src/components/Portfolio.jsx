import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github, Eye, Code, Zap, Utensils, QrCode, Receipt, CheckSquare, Package, X, Calendar, Users, Star, ArrowRight, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

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
      technologies: ['React Native', 'QR Code API', 'Firebase', 'Cloud Functions'],
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
      description: 'Comprehensive billing and invoicing system with automated calculations and payment tracking',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Stripe'],
      link: '#',
      github: '#',
      category: 'Finance',
      icon: Receipt,
      details: {
        duration: '5 months',
        team: '6 developers',
        status: 'in-progress',
        features: [
          'Automated billing generation',
          'Payment processing',
          'Invoice management',
          'Tax calculations',
          'Financial reporting'
        ],
        challenges: [
          'Complex tax calculation logic',
          'Payment gateway integration',
          'Data security compliance'
        ],
        solutions: [
          'Built modular tax calculation engine',
          'Implemented PCI DSS compliance',
          'Used Stripe for secure payments'
        ],
        screenshots: [
          'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
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
            isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
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
                <div 
                  key={project.id} 
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100 book-container ${
                    isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    </div>
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
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="flex space-x-2">
                        <Code className="w-5 h-5 text-gray-400" />
                        <Github className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-500 book-container ${
            isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
          }`}>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
              <span>View All Projects</span>
              <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-book-open">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl">
                    <selectedProject.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                    <p className="text-gray-600">{selectedProject.category}</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>{selectedProject.details.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-5 h-5" />
                        <span>{selectedProject.details.team}</span>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.details.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        <Star className="w-4 h-4" />
                        <span className="capitalize">{selectedProject.details.status}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.details.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Challenges & Solutions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Challenges:</h4>
                        <ul className="space-y-1">
                          {selectedProject.details.challenges.map((challenge, index) => (
                            <li key={index} className="text-gray-600 text-sm">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Solutions:</h4>
                        <ul className="space-y-1">
                          {selectedProject.details.solutions.map((solution, index) => (
                            <li key={index} className="text-gray-600 text-sm">• {solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a 
                      href={selectedProject.link}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Live Demo
                    </a>
                    <a 
                      href={selectedProject.github}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full font-medium text-center hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
