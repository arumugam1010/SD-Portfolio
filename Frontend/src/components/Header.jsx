import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Building2, BookOpen, Home, User, Settings, Briefcase, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigationClick = (section) => {
    setActiveSection(section);
    
    // Only add book view animation if not already active
    if (!document.body.classList.contains('book-view-active')) {
      document.body.classList.add('book-view-active');
      
      // Remove the class after animation completes
      setTimeout(() => {
        document.body.classList.remove('book-view-active');
      }, 1500);
    }
    
    // Scroll to section with book view effect
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl border-b border-indigo-400' : 'bg-gradient-to-r from-indigo-500/95 via-purple-500/95 to-pink-500/95 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group">
            <img 
              src="/Logo.png" 
              alt="Sri Devi Software Solutions Logo" 
              className="h-20 w-20 object-contain group-hover:scale-110 transition-all duration-500 animate-pulse"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-500 drop-shadow-lg">
                Sri Devi software solutions
              </span>
              <span className="text-sm font-medium text-yellow-200 transition-all duration-500">
                Technology Hub
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  className={`relative font-medium transition-all duration-300 group text-white hover:text-yellow-300 flex items-center space-x-2 ${
                    activeSection === item.id ? 'text-yellow-300' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </button>
              );
            })}
          </nav>

          {/* CTA Button
          <div className="hidden md:block">
            <a href="/admin/login" className="inline-block">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-yellow-300/50">
                Get Started
              </button>
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X size={24} className="text-white" /> : 
              <Menu size={24} className="text-white" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="pt-6 pb-4 space-y-1 rounded-2xl mt-4 px-4 bg-white/10 backdrop-blur-xl border border-white/20">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigationClick(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 font-medium hover:scale-105 text-white hover:text-yellow-300 hover:bg-white/10 flex items-center space-x-3 ${
                    activeSection === item.id ? 'text-yellow-300 bg-white/10' : ''
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
       
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
