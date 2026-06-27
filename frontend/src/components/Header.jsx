import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo-link">
          <div className="logo-spark">
            <Cpu className="spark-icon" />
          </div>
          <div className="logo-text">
            <span className="brand-name">Walmart</span>
            <span className="tech-division">Global Tech</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/careers" className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>
          <Link to="/newsroom" className={`nav-link ${location.pathname === '/newsroom' ? 'active' : ''}`}>Newsroom</Link>
          <Link to="/conferences" className={`nav-link ${location.pathname === '/conferences' ? 'active' : ''}`}>Conferences</Link>
          <Link to="/admin" className="btn btn-primary admin-btn">Admin Portal</Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/careers" className={`mobile-nav-link ${location.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>
          <Link to="/newsroom" className={`mobile-nav-link ${location.pathname === '/newsroom' ? 'active' : ''}`}>Newsroom</Link>
          <Link to="/conferences" className={`mobile-nav-link ${location.pathname === '/conferences' ? 'active' : ''}`}>Conferences</Link>
          <Link to="/admin" className="btn btn-primary mobile-admin-btn">Admin Portal</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
