import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Building2, Users, Award, TrendingUp, Star, CheckCircle, Zap, Globe, Shield, BookOpen } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Only manage visibility, not book view animation
      if (scrollY > 100 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    // Loading screen for 5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // Initial animation on mount after loading - only manage visibility
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="animate-pulse">
            <img 
              src="/Logo.png" 
              alt="Sri Devi Software Solutions Logo" 
              className="w-32 h-32 mx-auto mb-8 animate-bounce"
            />
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-2xl font-bold animate-pulse">
            Sri Devi Software Solutions
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full mx-auto animate-pulse"></div>
          <div className="text-gray-600 text-sm">
            Loading amazing experiences...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 book-container ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-fade-in shadow-sm">
                <BookOpen className="w-4 h-4" />
                <span>Leading IT Innovation Hub</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Building the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                  {' '}Future
                </span>
                <br />
                <span className="text-4xl lg:text-6xl text-gray-700">of Technology</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Sri Devi Software Solutions is a premier technology hub fostering innovation, 
                collaboration, and growth in the digital landscape. Join us in shaping the future.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                              <a 
                  href="#portfolio" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-book-shadow"
                >
                  <span className="font-semibold">Explore Our Portfolio</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </a>
          
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center group animate-book-float">
                <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-gray-600 font-medium">Companies</div>
              </div>
              <div className="text-center group animate-book-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-gray-600 font-medium">Employees</div>
              </div>
              {/* <div className="text-center group animate-book-float" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-gray-600 font-medium">Countries</div>
              </div> */}
              <div className="text-center group animate-book-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-gray-600 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 book-container ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative animate-book-float">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-3xl transform rotate-6 opacity-20 animate-pulse"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 animate-book-shadow">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group border border-blue-200/50" style={{ animationDelay: '0.2s' }}>
                    <Building2 className="mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <h3 className="font-semibold text-gray-900">Modern Infrastructure</h3>
                    <p className="text-sm text-gray-600 mt-2">State-of-the-art facilities</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group border border-purple-200/50" style={{ animationDelay: '0.4s' }}>
                    <Users className="mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <h3 className="font-semibold text-gray-900">Expert Teams</h3>
                    <p className="text-sm text-gray-600 mt-2">Skilled professionals</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group border border-green-200/50" style={{ animationDelay: '0.6s' }}>
                    <Award className="mx-auto mb-4 text-green-600 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <h3 className="font-semibold text-gray-900">Award Winning</h3>
                    <p className="text-sm text-gray-600 mt-2">Recognized excellence</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group border border-indigo-200/50" style={{ animationDelay: '0.8s' }}>
                    <TrendingUp className="mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <h3 className="font-semibold text-gray-900">Growth Focused</h3>
                    <p className="text-sm text-gray-600 mt-2">Continuous innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
