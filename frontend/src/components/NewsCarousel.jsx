import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import './NewsCarousel.css';

const NewsCarousel = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/news`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, news.length - 3) : prev - 1));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev >= news.length - 3 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="carousel-loading">
        <div className="spinner"></div>
        <p>Loading tech insights...</p>
      </div>
    );
  }

  if (news.length === 0) {
    return <p className="no-news">No news articles found.</p>;
  }

  return (
    <div className="carousel-outer-container">
      <div className="carousel-header">
        <div>
          <span className="pseudo-code">{"{ news.feed(); }"}</span>
          <h2 className="carousel-main-title">Latest Tech Insights</h2>
        </div>
        <div className="carousel-controls">
          <button onClick={slideLeft} className="control-btn" aria-label="Previous News">
            <ChevronLeft size={20} />
          </button>
          <button onClick={slideRight} className="control-btn" aria-label="Next News">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-wrapper">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {news.map((item) => (
            <div className="carousel-card-container" key={item._id}>
              <div className="news-card">
                <div className="news-image-wrap">
                  <img src={item.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'} alt={item.title} className="news-image" />
                  <span className="news-category">{item.category}</span>
                </div>
                <div className="news-info">
                  <div className="news-date">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-summary">{item.summary}</p>
                  <a href={item.link || '#'} className="news-readmore">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="arrow-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
