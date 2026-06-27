import React, { useState, useEffect } from 'react';
import { Briefcase, Newspaper, Mail, Users, FileText, Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats'); // stats | add-job | add-news | manage-jobs | manage-news

  // State for forms
  const [jobForm, setJobForm] = useState({ title: '', department: 'Digital Commerce', location: 'Sunnyvale, CA', description: '', requirements: '', type: 'Full-time', salaryRange: '' });
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Tech News', summary: '', content: '', link: '', image: '', featured: false });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);

  // State for loaded entities to manage
  const [jobs, setJobs] = useState([]);
  const [news, setNews] = useState([]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsAndNews = async () => {
    try {
      const apiUri = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const jobsRes = await fetch(`${apiUri}/api/jobs`);
      const jobsData = await jobsRes.json();
      setJobs(jobsData);

      const newsRes = await fetch(`${apiUri}/api/news`);
      const newsData = await newsRes.json();
      setNews(newsData);
    } catch (error) {
      console.error('Error loading entities:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchJobsAndNews();
  }, []);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Job posting published successfully!' });
        setJobForm({ title: '', department: 'Digital Commerce', location: 'Sunnyvale, CA', description: '', requirements: '', type: 'Full-time', salaryRange: '' });
        fetchStats();
        fetchJobsAndNews();
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Failed to create job.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Could not connect to the server.' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'News story published successfully!' });
        setNewsForm({ title: '', category: 'Tech News', summary: '', content: '', link: '', image: '', featured: false });
        fetchStats();
        fetchJobsAndNews();
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Failed to create news story.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Could not connect to the server.' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/jobs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setJobs(jobs.filter(j => j._id !== id));
        fetchStats();
      }
    } catch (error) {
      alert('Delete operation failed');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news story?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/news/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setNews(news.filter(n => n._id !== id));
        fetchStats();
      }
    } catch (error) {
      alert('Delete operation failed');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading administration hub...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="code-title">{"{ admin.portal(); }"}</span>
        </div>
        <nav className="sidebar-menu">
          <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => { setActiveTab('stats'); setFormStatus({ type: '', message: '' }); }}>Dashboard Stats</button>
          <button className={activeTab === 'add-job' ? 'active' : ''} onClick={() => { setActiveTab('add-job'); setFormStatus({ type: '', message: '' }); }}>Add Career Opening</button>
          <button className={activeTab === 'add-news' ? 'active' : ''} onClick={() => { setActiveTab('add-news'); setFormStatus({ type: '', message: '' }); }}>Add News Story</button>
          <button className={activeTab === 'manage-jobs' ? 'active' : ''} onClick={() => { setActiveTab('manage-jobs'); setFormStatus({ type: '', message: '' }); }}>Manage Jobs ({jobs.length})</button>
          <button className={activeTab === 'manage-news' ? 'active' : ''} onClick={() => { setActiveTab('manage-news'); setFormStatus({ type: '', message: '' }); }}>Manage News ({news.length})</button>
        </nav>
      </aside>

      <main className="admin-main">
        {/* DASHBOARD STATS TAB */}
        {activeTab === 'stats' && stats && (
          <div className="admin-view animate-slide-up">
            <h2 className="admin-page-title">Executive Summary</h2>
            
            <div className="stats-cards-grid">
              <div className="stat-card">
                <div className="stat-card-icon bg-blue"><Briefcase /></div>
                <div className="stat-card-info">
                  <span className="card-value">{stats.counts.jobs}</span>
                  <span className="card-label">Active Jobs</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-icon bg-amber"><Newspaper /></div>
                <div className="stat-card-info">
                  <span className="card-value">{stats.counts.news}</span>
                  <span className="card-label">News Stories</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-icon bg-green"><FileText /></div>
                <div className="stat-card-info">
                  <span className="card-value">{stats.counts.applications}</span>
                  <span className="card-label">Job Applications</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-icon bg-pink"><Users /></div>
                <div className="stat-card-info">
                  <span className="card-value">{stats.counts.registrations}</span>
                  <span className="card-label">Event Passes</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-icon bg-purple"><Mail /></div>
                <div className="stat-card-info">
                  <span className="card-value">{stats.counts.subscriptions}</span>
                  <span className="card-label">Newsletter subs</span>
                </div>
              </div>
            </div>

            <div className="admin-tables-grid">
              {/* Recent Applications */}
              <div className="admin-table-card">
                <h3>Recent Job Applications</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Applied For</th>
                        <th>Portfolio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.applications.length === 0 ? (
                        <tr><td colSpan="4" className="text-center">No applications received yet.</td></tr>
                      ) : (
                        stats.applications.map((app) => (
                          <tr key={app._id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.jobId ? app.jobId.title : 'Deleted Job'}</td>
                            <td>{app.portfolioUrl ? <a href={app.portfolioUrl} target="_blank" rel="noreferrer">Link</a> : '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Registrations */}
              <div className="admin-table-card">
                <h3>Recent Conference Passes</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Conference</th>
                        <th>Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.registrations.length === 0 ? (
                        <tr><td colSpan="4" className="text-center">No passes claimed yet.</td></tr>
                      ) : (
                        stats.registrations.map((reg) => (
                          <tr key={reg._id}>
                            <td>{reg.name}</td>
                            <td>{reg.email}</td>
                            <td className="truncate-text">{reg.conferenceName}</td>
                            <td>{reg.company || '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD CAREER TAB */}
        {activeTab === 'add-job' && (
          <div className="admin-view animate-slide-up">
            <h2 className="admin-page-title">Publish Job Listing</h2>
            <form onSubmit={handleJobSubmit} className="admin-form">
              <div className="grid-2 form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input type="text" required value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. Lead React Developer" />
                </div>
                <div className="form-group">
                  <label>Salary Range</label>
                  <input type="text" value={jobForm.salaryRange} onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })} placeholder="e.g. $120,000 - $150,000" />
                </div>
              </div>

              <div className="grid-3 form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}>
                    <option value="Digital Commerce">Digital Commerce</option>
                    <option value="Supply Chain Tech">Supply Chain Tech</option>
                    <option value="Data & Intelligence">Data & Intelligence</option>
                    <option value="Global Security">Global Security</option>
                    <option value="Emerging Tech">Emerging Tech</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <select value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}>
                    <option value="Sunnyvale, CA">Sunnyvale, CA</option>
                    <option value="Bentonville, AR">Bentonville, AR</option>
                    <option value="Dallas, TX">Dallas, TX</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Employment Type</label>
                  <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea rows={4} required value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} placeholder="Provide key tasks, team focus and details..." />
              </div>

              <div className="form-group">
                <label>Key Requirements (comma separated)</label>
                <input type="text" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} placeholder="React experience, REST APIs, Git..." />
              </div>

              {formStatus.message && (
                <div className={`form-status-alert ${formStatus.type}`}>
                  {formStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  <span>{formStatus.message}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary publish-btn" disabled={formLoading}>
                {formLoading ? 'Publishing...' : 'Publish Career Listing'}
              </button>
            </form>
          </div>
        )}

        {/* ADD NEWS STORY TAB */}
        {activeTab === 'add-news' && (
          <div className="admin-view animate-slide-up">
            <h2 className="admin-page-title">Publish Tech Story</h2>
            <form onSubmit={handleNewsSubmit} className="admin-form">
              <div className="grid-2 form-row">
                <div className="form-group">
                  <label>Story Title</label>
                  <input type="text" required value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} placeholder="e.g. Scaling logistics networks for Peak Season" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}>
                    <option value="Tech News">Tech News</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Cloud Engineering">Cloud Engineering</option>
                    <option value="Diversity & Culture">Diversity & Culture</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>
              </div>

              <div className="grid-2 form-row">
                <div className="form-group">
                  <label>Image URL</label>
                  <input type="text" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} placeholder="Unsplash URL or image link..." />
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={newsForm.featured} onChange={(e) => setNewsForm({ ...newsForm, featured: e.target.checked })} />
                    <span>Feature this story in Carousel</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Story Summary (One paragraph)</label>
                <textarea rows={2} required value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} placeholder="Give a brief summary to show on news feed card..." />
              </div>

              <div className="form-group">
                <label>Full Story Content</label>
                <textarea rows={6} value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} placeholder="Write full article here..." />
              </div>

              {formStatus.message && (
                <div className={`form-status-alert ${formStatus.type}`}>
                  {formStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  <span>{formStatus.message}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary publish-btn" disabled={formLoading}>
                {formLoading ? 'Publishing...' : 'Publish Tech Story'}
              </button>
            </form>
          </div>
        )}

        {/* MANAGE JOBS TAB */}
        {activeTab === 'manage-jobs' && (
          <div className="admin-view animate-slide-up">
            <h2 className="admin-page-title">Manage Postings</h2>
            <div className="manage-list">
              {jobs.map((job) => (
                <div className="manage-item-row" key={job._id}>
                  <div className="manage-item-info">
                    <h3>{job.title}</h3>
                    <p>{job.department} &bull; {job.location} &bull; {job.type}</p>
                  </div>
                  <button className="delete-row-btn" onClick={() => handleDeleteJob(job._id)} aria-label="Delete job button">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANAGE NEWS TAB */}
        {activeTab === 'manage-news' && (
          <div className="admin-view animate-slide-up">
            <h2 className="admin-page-title">Manage News</h2>
            <div className="manage-list">
              {news.map((item) => (
                <div className="manage-item-row" key={item._id}>
                  <div className="manage-item-info">
                    <h3>{item.title}</h3>
                    <p>{item.category} &bull; {item.date}</p>
                  </div>
                  <button className="delete-row-btn" onClick={() => handleDeleteNews(item._id)} aria-label="Delete news button">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
