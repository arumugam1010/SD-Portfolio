import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// Admin Pages
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Contacts from './pages/admin/Contacts.jsx';
import ContactDetail from './pages/admin/ContactDetail.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [animateHome, setAnimateHome] = useState(false);

  useEffect(() => {
    const element = document.querySelector('.your-animated-element-class');
    if (!element) return;

    const handleAnimationEnd = () => {
      element.classList.remove('animate-section-transition', 'animate-page-flip-nav', 'animate-book-page-reveal');
    };

    element.addEventListener('animationend', handleAnimationEnd);
    return () => element.removeEventListener('animationend', handleAnimationEnd);
  }, []);

  // Main Website Component
  const MainWebsite = () => (
    <div className="min-h-screen">
      <Header />
      <div id="home" className={animateHome ? "animate-book-open" : ""}>
        <Hero />
      </div>
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={<MainWebsite />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/contacts" element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        } />
        <Route path="/admin/contacts/:id" element={
          <ProtectedRoute>
            <ContactDetail />
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
