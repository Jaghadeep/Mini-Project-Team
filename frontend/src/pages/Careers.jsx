import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, Building, Clock, DollarSign, Search, CheckCircle, X } from 'lucide-react';
import './Careers.css';

const Careers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search filter states initialized from query parameters
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [locationSelect, setLocationSelect] = useState(searchParams.get('location') || 'All');
  const [deptSelect, setDeptSelect] = useState('All');
  const [typeSelect, setTypeSelect] = useState('All');

  // Modal application state
  const [selectedJob, setSelectedJob] = useState(null);
  const [appForm, setAppForm] = useState({ name: '', email: '', coverLetter: '', portfolioUrl: '' });
  const [appStatus, setAppStatus] = useState({ type: '', message: '' });
  const [appLoading, setAppLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('q', keyword);
      if (locationSelect && locationSelect !== 'All') params.append('location', locationSelect);
      if (deptSelect && deptSelect !== 'All') params.append('department', deptSelect);
      if (typeSelect && typeSelect !== 'All') params.append('type', typeSelect);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs?${params.toString()}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, locationSelect, deptSelect, typeSelect]);

  // Sync state if URL query params change (e.g. searching from Hero bar)
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const locParam = searchParams.get('location') || 'All';
    setKeyword(qParam);
    setLocationSelect(locParam);
  }, [searchParams]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    const params = {};
    if (keyword) params.q = keyword;
    if (locationSelect && locationSelect !== 'All') params.location = locationSelect;
    setSearchParams(params);
    fetchJobs();
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    setAppLoading(true);
    setAppStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...appForm,
          jobId: selectedJob._id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAppStatus({ type: 'success', message: 'Application submitted successfully! Our talent acquisition squad will be in touch.' });
        setAppForm({ name: '', email: '', coverLetter: '', portfolioUrl: '' });
        // Close modal after delay
        setTimeout(() => {
          setSelectedJob(null);
          setAppStatus({ type: '', message: '' });
        }, 3000);
      } else {
        setAppStatus({ type: 'error', message: data.message || 'Failed to submit application.' });
      }
    } catch (error) {
      setAppStatus({ type: 'error', message: 'Could not connect to the server.' });
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <div className="careers-page">
      <section className="careers-hero">
        <div className="container careers-hero-content animate-slide-up">
          <span className="pseudo-code">{"{ careers.search(); }"}</span>
          <h1>Build the Future of Smart Commerce</h1>
          <p>Find your next engineering mission. We scale products, algorithms, and systems that empower communities around the globe.</p>
        </div>
      </section>

      <section className="jobs-container-section section-padding">
        <div className="container">
          {/* Search and Filters Panels */}
          <div className="filter-panel">
            <form className="filter-search-row" onSubmit={handleSearchClick}>
              <div className="search-field-wrap">
                <Search size={18} className="search-icon-left" />
                <input 
                  type="text" 
                  placeholder="Keywords (e.g. Go, React, Developer)..." 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary search-filter-btn">Search</button>
            </form>

            <div className="filter-selects-row">
              <div className="filter-select-group">
                <label>Location</label>
                <select value={locationSelect} onChange={(e) => setLocationSelect(e.target.value)}>
                  <option value="All">All Locations</option>
                  <option value="Sunnyvale, CA">Sunnyvale, CA</option>
                  <option value="Bentonville, AR">Bentonville, AR</option>
                  <option value="Dallas, TX">Dallas, TX</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="filter-select-group">
                <label>Department</label>
                <select value={deptSelect} onChange={(e) => setDeptSelect(e.target.value)}>
                  <option value="All">All Departments</option>
                  <option value="Digital Commerce">Digital Commerce</option>
                  <option value="Supply Chain Tech">Supply Chain Tech</option>
                  <option value="Data & Intelligence">Data & Intelligence</option>
                  <option value="Global Security">Global Security</option>
                  <option value="Emerging Tech">Emerging Tech</option>
                </select>
              </div>

              <div className="filter-select-group">
                <label>Employment Type</label>
                <select value={typeSelect} onChange={(e) => setTypeSelect(e.target.value)}>
                  <option value="All">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job List View */}
          <div className="jobs-list">
            {loading ? (
              <div className="jobs-loading">
                <div className="spinner"></div>
                <p>Retrieving opportunities...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="no-jobs-found">
                <p>No job matches found matching your filters. Try checking a different combination or search keyword.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div className="job-row-card" key={job._id}>
                  <div className="job-row-main">
                    <h3 className="job-row-title">{job.title}</h3>
                    
                    <div className="job-row-tags">
                      <span className="job-tag">
                        <Building size={14} />
                        {job.department}
                      </span>
                      <span className="job-tag">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="job-tag">
                        <Clock size={14} />
                        {job.type}
                      </span>
                      {job.salaryRange && (
                        <span className="job-tag">
                          <DollarSign size={14} />
                          {job.salaryRange}
                        </span>
                      )}
                    </div>

                    <p className="job-row-desc">{job.description}</p>
                    
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="job-row-reqs">
                        <strong>Requirements:</strong>
                        <ul>
                          {job.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                          {job.requirements.length > 3 && <li>And {job.requirements.length - 3} more...</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="job-row-actions">
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setSelectedJob(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedJob(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className="pseudo-code">{"{ candidate.apply(); }"}</span>
              <h2>Apply for {selectedJob.title}</h2>
              <p className="modal-job-sub">{selectedJob.department} &bull; {selectedJob.location}</p>
            </div>

            {appStatus.type === 'success' ? (
              <div className="app-success-view">
                <CheckCircle size={48} className="success-icon" />
                <h3>Application Submitted!</h3>
                <p>{appStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="application-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={appForm.name}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="e.g. john.doe@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Portfolio / LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={appForm.portfolioUrl}
                    onChange={(e) => setAppForm({ ...appForm, portfolioUrl: e.target.value })}
                    placeholder="e.g. github.com/johndoe"
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter / Summary</label>
                  <textarea 
                    rows={4}
                    value={appForm.coverLetter}
                    onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })}
                    placeholder="Tell us about your technical projects and experience..."
                  />
                </div>

                {appStatus.type === 'error' && (
                  <div className="app-error-alert">
                    {appStatus.message}
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedJob(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={appLoading}>
                    {appLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
