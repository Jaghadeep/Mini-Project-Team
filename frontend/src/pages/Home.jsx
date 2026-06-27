import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Podcast, Globe, Compass, Star } from 'lucide-react';
import Hero from '../components/Hero';
import NewsCarousel from '../components/NewsCarousel';
import Pillars from '../components/Pillars';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Pillars Section */}
      <Pillars />

      {/* 3. Retail Rewired Section */}
      <section className="retail-rewired-section section-padding">
        <div className="container grid-2 rewired-grid">
          <div className="rewired-left">
            <div className="podcast-badge">
              <Podcast size={16} />
              <span>Podcast Series</span>
            </div>
            <h2 className="rewired-title">Retail.Rewired()</h2>
            <p className="rewired-desc">
              Tune into our exclusive podcast where engineering leaders, technologists, and industry experts discuss how cloud engineering, edge computing, and artificial intelligence are redefining user convenience at global scale.
            </p>
            <div className="rewired-actions">
              <a href="#" className="btn btn-primary">Listen on Spotify</a>
              <a href="#" className="btn btn-outline btn-white">Watch on YouTube</a>
            </div>
          </div>
          <div className="rewired-right">
            <div className="podcast-card">
              <div className="podcast-card-header">
                <Star size={24} className="star-highlight" />
                <span className="episode-num">Episode #48</span>
              </div>
              <h3 className="episode-title">Architecting Microservices for 100M+ Requests</h3>
              <p className="episode-guest">Featuring Jane Doe, VP of Cloud Infrastructure</p>
              <div className="audio-visualizer">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
                <div className="bar bar-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Insights / News Carousel */}
      <section className="news-carousel-section section-padding">
        <div className="container">
          <NewsCarousel />
        </div>
      </section>

      {/* 5. Explore More Grid */}
      <section className="explore-section section-padding">
        <div className="container">
          <div className="explore-heading">
            <span className="pseudo-code">{"{ explore.more(); }"}</span>
            <h2 className="explore-main-title">Explore Walmart Global Tech</h2>
          </div>
          
          <div className="grid-3 explore-grid">
            {/* Box 1 */}
            <div className="explore-card">
              <div className="explore-icon-circle bg-blue">
                <Globe size={24} />
              </div>
              <h3>Flagship Conferences</h3>
              <p>Register for our upcoming Global Tech Summit and connect with industry leaders in AI, cloud orchestration, and edge infrastructure.</p>
              <Link to="/conferences" className="explore-card-link">
                <span>View Conferences</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            {/* Box 2 */}
            <div className="explore-card">
              <div className="explore-icon-circle bg-amber">
                <Compass size={24} />
              </div>
              <h3>Life at Walmart Tech</h3>
              <p>Explore what makes our offices, work-from-home channels, and engineering guilds the prime ecosystem for professional developers.</p>
              <Link to="/about" className="explore-card-link">
                <span>Discover Life Here</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            {/* Box 3 */}
            <div className="explore-card">
              <div className="explore-icon-circle bg-pink">
                <Star size={24} />
              </div>
              <h3>Careers & Postings</h3>
              <p>Ready to make a massive impact? Find open developer roles, internship opportunities, and leadership paths across our global offices.</p>
              <Link to="/careers" className="explore-card-link">
                <span>Browse Job Board</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
