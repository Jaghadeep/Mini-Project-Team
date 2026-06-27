import React, { useState, useEffect } from 'react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import './NewsRoom.css';

const NewsRoom = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="newsroom-page">
      <section className="newsroom-hero">
        <div className="container newsroom-hero-content animate-slide-up">
          <span className="pseudo-code">{"{ newsroom.feed(); }"}</span>
          <h1>Walmart Global Tech News & Insights</h1>
          <p>Discover how our engineers, innovators, and scientists are building platforms to redefine global commerce.</p>
        </div>
      </section>

      <section className="newsroom-content-section section-padding">
        <div className="container">
          <div className="newsroom-search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search news stories by title, category, or summary..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="newsroom-loading">
              <div className="spinner"></div>
              <p>Loading insights...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="no-news-found">
              <p>No articles match your search parameters. Try searching something else.</p>
            </div>
          ) : (
            <div className="newsroom-grid">
              {filteredNews.map((item) => (
                <article className="newsroom-article-card" key={item._id}>
                  <div className="article-image-wrap">
                    <img src={item.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'} alt={item.title} />
                    <span className="article-category">{item.category}</span>
                  </div>
                  <div className="article-body">
                    <div className="article-date">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>
                    <h2 className="article-title">{item.title}</h2>
                    <p className="article-summary">{item.summary}</p>
                    {item.content && <p className="article-content-preview">{item.content.substring(0, 120)}...</p>}
                    <a href={item.link || '#'} className="article-link">
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsRoom;
