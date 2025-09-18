import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye, Heart, Zap, Rocket, Users, Award, TrendingUp, CheckCircle, Clock, Star, Building2 } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 book-container ${
          isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            <span>New Startup Company</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Sri Devi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Software Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a brand new startup company passionate about innovation, 
            delivering cutting-edge software solutions, and building the future 
            of technology with fresh perspectives and modern approaches.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className={`transition-all duration-1000 delay-200 book-container ${
            isVisible ? 'opacity-100 translate-x-0 animate-book-open' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform -rotate-3 opacity-10 animate-pulse"></div>
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern Startup Office"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-400 book-container ${
            isVisible ? 'opacity-100 translate-x-0 animate-book-open' : 'opacity-0 translate-x-10'
          }`}>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                New Innovation Startup
              </h3>
              <p className="text-gray-600 leading-relaxed">
                As a newly established startup, Sri Devi Software Solutions brings fresh perspectives 
                to technological advancement, providing innovative software solutions 
                and creating a collaborative environment where businesses can thrive and grow.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:scale-105 transition-transform duration-300 border border-green-200">
                <div className="text-2xl font-bold text-green-600">1+</div>
                <div className="text-gray-600">Year New Startup</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:scale-105 transition-transform duration-300 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Statistics */}
        <div className={`mb-20 transition-all duration-1000 delay-600 book-container ${
          isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our New Startup Progress</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track our journey as a new startup with real-time project statistics and achievements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:scale-105 border border-green-200">
              <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
              <div className="text-3xl font-bold text-green-600 mb-2">1</div>
              <div className="text-gray-700 font-semibold">Completed</div>
              <div className="text-gray-600 text-sm">Projects</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:scale-105 border border-yellow-200">
              <Clock className="mx-auto mb-4 text-yellow-600" size={48} />
              <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
              <div className="text-gray-700 font-semibold">In Progress</div>
              <div className="text-gray-600 text-sm">Projects</div>
            </div>
            
                         <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:scale-105 border border-blue-200">
               <Users className="mx-auto mb-4 text-blue-600" size={48} />
               <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
               <div className="text-gray-700 font-semibold">Team</div>
               <div className="text-gray-600 text-sm">Members</div>
             </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:scale-105 border border-purple-200">
              <Star className="mx-auto mb-4 text-purple-600" size={48} />
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-700 font-semibold">Client</div>
              <div className="text-gray-600 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To create innovative software solutions that drive business growth and digital transformation.' },
            { icon: Eye, title: 'Our Vision', desc: 'To be the leading software development startup, known for excellence and innovation.' },
            { icon: Heart, title: 'Our Values', desc: 'Integrity, innovation, collaboration, and commitment to excellence in everything we do.' },
            { icon: Zap, title: 'Our Impact', desc: 'Transforming businesses and communities through cutting-edge technology solutions.' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100 book-container ${
                isVisible ? 'opacity-100 translate-y-0 animate-book-open' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <item.icon className="mx-auto mb-4 text-blue-600" size={48} />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
