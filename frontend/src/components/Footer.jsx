import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for subscribing!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Subscription failed.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Could not connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-brand-name">Walmart</span>
            <span className="footer-tech-division">Global Tech</span>
          </div>
          <p className="footer-desc">
            We are a team of software engineers, data scientists, and systems experts, building technology solutions to transform the world's largest retailer.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="LinkedIn">LN</a>
            <a href="#" className="social-link" aria-label="Twitter">TW</a>
            <a href="#" className="social-link" aria-label="GitHub">GH</a>
            <a href="#" className="social-link" aria-label="YouTube">YT</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/newsroom">Newsroom</Link></li>
            <li><Link to="/conferences">Conferences</Link></li>
          </ul>
        </div>

        {/* Core Pillars */}
        <div className="footer-links">
          <h3 className="footer-title">Core Pillars</h3>
          <ul className="footer-links-list">
            <li><a href="#pillars">Innovation</a></li>
            <li><a href="#pillars">Culture & Inclusion</a></li>
            <li><a href="#pillars">Global Scale</a></li>
            <li><a href="#pillars">Career Growth</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <h3 className="footer-title">Subscribe to Tech Alerts</h3>
          <p className="newsletter-desc">Get the latest insights, open-source releases, and career opportunities delivered straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary newsletter-btn" disabled={loading} aria-label="Subscribe button">
              <Send size={16} />
            </button>
          </form>

          {status.message && (
            <div className={`subscription-status ${status.type}`}>
              {status.type === 'success' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">&copy; {new Date().getFullYear()} Walmart Global Tech Replica. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">California Privacy Rights</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
