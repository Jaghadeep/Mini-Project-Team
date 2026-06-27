import React, { useState } from 'react';
import { Terminal, Play, Pause, ChevronRight } from 'lucide-react';
import JobSearch from './JobSearch';
import './Hero.css';

const Hero = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="hero-container">
      {/* Background Graphic Grid */}
      <div className="hero-grid-overlay"></div>
      
      <div className="container hero-content animate-slide-up">
        <div className="hero-left">
          <div className="terminal-badge">
            <Terminal size={14} className="terminal-icon" />
            <span className="terminal-text">npm start --global-retail-tech</span>
          </div>
          
          <h1 className="hero-title">
            <span className="code-title">We.Are</span>
            <span className="brackets">(</span>
            <span className="title-highlight">Global Tech</span>
            <span className="brackets">);</span>
          </h1>
          
          <p className="hero-subtitle">
            Reimagining retail solutions. We build platforms, systems, and algorithms that power millions of customer interactions every single day.
          </p>

          {/* Interactive Job Search Bar Component */}
          <JobSearch />
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">25,000+</span>
              <span className="stat-label">Tech Associates</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">100M+</span>
              <span className="stat-label">Customers Weekly</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">15+</span>
              <span className="stat-label">Global Offices</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual-card">
            <div className="visual-header">
              <div className="window-dot red"></div>
              <div className="window-dot yellow"></div>
              <div className="window-dot green"></div>
              <span className="window-title">retail-rewired.py</span>
            </div>
            <div className="visual-body">
              <pre className="code-snippet">
                <code>
{`# Walmart Global Tech Ecosystem
import retail_ai
import global_supply_chain

class RetailEcosystem:
    def __init__(self):
        self.scale = "240_million_customers"
        self.focus = ["AI", "ML", "Robotics", "Edge"]
        
    def innovate(self):
        print("Innovating at scale...")
        return {
            "impact": "Global",
            "speed": "Real-time",
            "experience": "Frictionless"
        }

# Initializing future...
future = RetailEcosystem().innovate()`}
                </code>
              </pre>
            </div>
            <div className="visual-footer">
              <button 
                className="btn-transcript" 
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </button>
            </div>
          </div>
          
          {showTranscript && (
            <div className="transcript-overlay">
              <h4>Hero Section Transcript</h4>
              <p>
                This visual represents the programming environment of Walmart Global Tech's core codebase. It illustrates how we link supply chain management, data intelligence, and customer experience through Python class schemas, scaling innovations to over 240 million weekly shoppers globally.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
