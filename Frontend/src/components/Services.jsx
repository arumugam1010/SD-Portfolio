import React, { useEffect, useRef, useState } from 'react';
import { 
  Cloud, 
  Shield, 
  Smartphone, 
  Database, 
  Cpu, 
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Rocket,
  Target,
  Users,
  X,
  Calendar,
  Users as TeamIcon,
  Award,
  Clock
} from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Only manage visibility, not book view animation
      if (scrollY > 200 && !isVisible) {
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions with 99.9% uptime guarantee and enterprise-grade security',
      features: ['AWS & Azure Integration', '24/7 Monitoring', 'Auto Scaling', 'Backup Solutions'],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      details: {
        duration: '12-13 weeks',
        team: '3-5 members',
        pricing: 'Starting from ₹50,000',
        image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Our cloud infrastructure services provide enterprise-grade solutions that scale with your business needs. We ensure 99.9% uptime with comprehensive monitoring and automated backup systems.',
        benefits: [
          'Reduced infrastructure costs by 40%',
          'Improved performance and reliability',
          '24/7 monitoring and support',
          'Automatic scaling based on demand'
        ],
        technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
        process: [
          'Initial assessment and planning',
          'Infrastructure design and architecture',
          'Implementation and testing',
          'Monitoring setup and optimization'
        ]
      }
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Advanced security measures to protect your digital assets and ensure compliance',
      features: ['Threat Detection', 'Data Encryption', 'Security Audits', 'Compliance Management'],
      color: 'red',
      gradient: 'from-red-500 to-pink-500',
      details: {
        duration: '12-13 weeks',
        team: '4-6 members',
        pricing: 'Starting from ₹75,000',
        image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Comprehensive cybersecurity solutions to protect your business from evolving threats. We implement multi-layered security measures and ensure compliance with industry standards.',
        benefits: [
          'Protection against 99.9% of known threats',
          'Compliance with industry regulations',
          'Real-time threat monitoring',
          'Regular security assessments'
        ],
        technologies: ['Firewall', 'VPN', 'SIEM', 'Penetration Testing', 'Encryption', 'Compliance Tools'],
        process: [
          'Security assessment and audit',
          'Threat modeling and risk analysis',
          'Implementation of security measures',
          'Ongoing monitoring and updates'
        ]
      }
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications with cutting-edge technology',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      details: {
        duration: '12-13 weeks',
        team: '5-8 members',
        pricing: 'Starting from ₹2,00,000',
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Custom mobile applications built with the latest technologies. We create intuitive, high-performance apps that deliver exceptional user experiences across all devices.',
        benefits: [
          'Cross-platform compatibility',
          'Native performance optimization',
          'App store optimization',
          'Regular updates and maintenance'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store Connect'],
        process: [
          'Requirements gathering and design',
          'UI/UX design and prototyping',
          'Development and testing',
          'App store submission and launch'
        ]
      }
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Transform your data into actionable business insights with AI-powered analytics',
      features: ['Big Data Processing', 'Machine Learning', 'Real-time Analytics', 'Custom Dashboards'],
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
      details: {
        duration: '12-13 weeks',
        team: '4-7 members',
        pricing: 'Starting from ₹1,50,000',
        image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Transform your raw data into actionable insights with our advanced analytics solutions. We help businesses make data-driven decisions with real-time dashboards and predictive analytics.',
        benefits: [
          'Real-time data insights',
          'Predictive analytics capabilities',
          'Custom dashboard creation',
          'Automated reporting systems'
        ],
        technologies: ['Python', 'R', 'Tableau', 'Power BI', 'Apache Spark', 'TensorFlow'],
        process: [
          'Data assessment and cleaning',
          'Analytics model development',
          'Dashboard creation and testing',
          'Deployment and training'
        ]
      }
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      description: 'Cutting-edge AI solutions for modern businesses and automation',
      features: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Automation'],
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500',
      details: {
        duration: '12-13 weeks',
        team: '6-10 members',
        pricing: 'Starting from ₹3,00,000',
        image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent solutions that give your business a competitive edge.',
        benefits: [
          'Process automation up to 80%',
          'Improved decision making',
          'Cost reduction through efficiency',
          'Competitive advantage through AI'
        ],
        technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP', 'AutoML'],
        process: [
          'AI strategy and planning',
          'Data preparation and model training',
          'Integration and testing',
          'Deployment and optimization'
        ]
      }
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive web applications and websites with optimal performance',
      features: ['React & Next.js', 'E-commerce Solutions', 'CMS Development', 'SEO Optimization'],
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500',
      details: {
        duration: '12-13 weeks',
        team: '3-6 members',
        pricing: 'Starting from ₹1,00,000',
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        overview: 'Modern, responsive web applications built with cutting-edge technologies. We create fast, scalable, and user-friendly websites that drive business growth.',
        benefits: [
          'Responsive design for all devices',
          'Fast loading and optimization',
          'SEO-friendly architecture',
          'Scalable and maintainable code'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS'],
        process: [
          'Requirements analysis and planning',
          'Design and prototyping',
          'Development and testing',
          'Deployment and optimization'
        ]
      }
    }
  ];

  const colorClasses = {
    blue: 'text-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
    red: 'text-red-600 bg-gradient-to-br from-red-50 to-pink-50 border-red-200',
    green: 'text-green-600 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
    purple: 'text-purple-600 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200',
    orange: 'text-orange-600 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
    indigo: 'text-indigo-600 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'
  };

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 book-container ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth 
            and digital transformation journey with cutting-edge innovation.
          </p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 border border-white/20 book-container hover:border-blue-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => handleLearnMore(service)}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-6 border ${colorClasses[service.color]} group-hover:scale-110 transition-transform duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
                <service.icon size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3 group/feature">
                    <div className="p-1 bg-green-100 rounded-full">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover/feature:text-gray-900 transition-colors duration-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="group/btn flex items-center space-x-2 text-blue-600 font-semibold transition-all duration-300 group-hover:text-blue-700">
                <span>Click to Learn More</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>

              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Featured Service Detail */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 transition-all duration-1000 book-container ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {(() => {
                const IconComponent = services[activeService].icon;
                return (
                  <div className={`inline-flex p-4 rounded-2xl mb-6 border ${colorClasses[services[activeService].color]} animate-pulse`}>
                    <IconComponent size={48} />
                  </div>
                );
              })()}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Featured: {services[activeService].title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {services[activeService].description}
              </p>
         
            </div>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${services[activeService].gradient} rounded-3xl transform rotate-3 opacity-20 animate-pulse`}></div>
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Technology Services"
                className="relative rounded-3xl shadow-2xl w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${colorClasses[selectedService.color]}`}>
                  <selectedService.icon size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedService.title}</h2>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Image and Overview */}
                <div>
                  <div className="relative mb-6">
                    <img
                      src={selectedService.details.image}
                      alt={selectedService.title}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${selectedService.gradient} rounded-2xl opacity-20`}></div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedService.details.overview}</p>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                  {/* Service Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Duration</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{selectedService.details.duration}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <TeamIcon className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Team Size</span>
                      </div>
                      <p className="text-lg font-bold text-green-900">{selectedService.details.team}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 col-span-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Starting Price</span>
                      </div>
                      <p className="text-lg font-bold text-purple-900">{selectedService.details.pricing}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                    <div className="space-y-3">
                      {selectedService.details.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="p-1 bg-green-100 rounded-full">
                            <CheckCircle size={16} className="text-green-600" />
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.details.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Process</h3>
                    <div className="space-y-3">
                      {selectedService.details.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Close
                </button>
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2">
                  <span>Get Started</span>
                  <Rocket className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
