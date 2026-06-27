import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import './JobSearch.css';

const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (location) params.append('location', location);
    
    navigate(`/careers?${params.toString()}`);
  };

  return (
    <form className="job-search-form" onSubmit={handleSearchSubmit}>
      <div className="search-input-group">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Role, skill, or keyword (e.g. React)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-field"
        />
      </div>
      <div className="search-input-group separator">
        <MapPin className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Location (e.g. Sunnyvale, CA)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-field"
        />
      </div>
      <button type="submit" className="btn btn-secondary search-submit-btn">
        Find Jobs
      </button>
    </form>
  );
};

export default JobSearch;
