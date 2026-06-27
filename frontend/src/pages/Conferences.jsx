import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, X, Users, Terminal, Video } from 'lucide-react';
import './Conferences.css';

const Conferences = () => {
  const conferencesList = [
    {
      id: 'summit-2026',
      title: 'Walmart Global Technology Summit 2026',
      date: 'September 14-16, 2026',
      location: 'Bentonville, AR & Virtual',
      mode: 'Hybrid',
      description: 'Our premier annual conference. Join engineering leaders and data scientists as we explore scale, cloud orchestration frameworks, and next-generation supply pipeline automation.',
      themes: ['Hybrid Cloud orchestration', 'Edge Compute scaling', 'AI/ML supply planning']
    },
    {
      id: 'ai-retail-2026',
      title: 'AI & Machine Learning in Retail',
      date: 'November 05, 2026',
      location: 'Sunnyvale, CA',
      mode: 'In-person Only',
      description: 'Deep dive into computer vision algorithms, real-time recommendation engines, and chatbot LLM safety models deployed across digital storefronts and smart checkouts.',
      themes: ['Generative LLMs in commerce', 'Vision-guided inventory', 'Neural recommendation models']
    },
    {
      id: 'open-source-2026',
      title: 'Walmart Open Source Summit',
      date: 'December 10, 2026',
      location: 'Virtual Event',
      mode: 'Virtual Only',
      description: 'Highlighting our community contributions. Learn about our latest open-source releases in edge management, database drivers, and React micro-frontend libraries.',
      themes: ['Luminate-Orchestrate configs', 'Peer-to-peer data syncing', 'Modern React micro-frontends']
    }
  ];

  const [selectedConf, setSelectedConf] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', jobTitle: '', company: '' });
  const [regStatus, setRegStatus] = useState({ type: '', message: '' });
  const [regLoading, setRegLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConf) return;

    setRegLoading(true);
    setRegStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/register-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...regForm,
          conferenceName: selectedConf.title
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRegStatus({ type: 'success', message: `Successfully registered for ${selectedConf.title}! A confirmation ticket and digital pass have been sent to your email.` });
        setRegForm({ name: '', email: '', jobTitle: '', company: '' });
        
        // Close modal after delay
        setTimeout(() => {
          setSelectedConf(null);
          setRegStatus({ type: '', message: '' });
        }, 4000);
      } else {
        setRegStatus({ type: 'error', message: data.message || 'Registration failed.' });
      }
    } catch (error) {
      setRegStatus({ type: 'error', message: 'Could not connect to server.' });
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="conferences-page">
      <section className="conf-hero">
        <div className="container conf-hero-content animate-slide-up">
          <span className="pseudo-code">{"{ events.schedule(); }"}</span>
          <h1>Flagship Tech Conferences</h1>
          <p>Join Walmart Global Tech associates, industry researchers, and developers as we dissect retail solutions at scale.</p>
        </div>
      </section>

      <section className="conf-list-section section-padding">
        <div className="container">
          <div className="conf-grid">
            {conferencesList.map((conf) => (
              <div className="conf-card" key={conf.id}>
                <div className="conf-card-header">
                  <span className="conf-mode-badge">
                    {conf.mode === 'Hybrid' ? <Users size={12} /> : conf.mode === 'In-person Only' ? <MapPin size={12} /> : <Video size={12} />}
                    <span>{conf.mode}</span>
                  </span>
                  <h2 className="conf-card-title">{conf.title}</h2>
                </div>

                <div className="conf-details-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{conf.date}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{conf.location}</span>
                  </div>
                </div>

                <p className="conf-desc">{conf.description}</p>

                <div className="conf-themes">
                  <h4>Core Tracks:</h4>
                  <div className="theme-tags">
                    {conf.themes.map((theme, i) => (
                      <span className="theme-tag" key={i}>
                        <Terminal size={12} />
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn btn-primary conf-reg-btn"
                  onClick={() => setSelectedConf(conf)}
                >
                  Register for Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal Overlay */}
      {selectedConf && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedConf(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className="pseudo-code">{"{ ticket.issue(); }"}</span>
              <h2>Event Registration</h2>
              <p className="modal-conf-name">{selectedConf.title}</p>
            </div>

            {regStatus.type === 'success' ? (
              <div className="reg-success-view">
                <CheckCircle size={48} className="success-icon" />
                <h3>Registration Confirmed!</h3>
                <p>{regStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="registration-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="e.g. john.doe@example.com"
                  />
                </div>

                <div className="grid-2 form-grid-row">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input 
                      type="text" 
                      value={regForm.jobTitle}
                      onChange={(e) => setRegForm({ ...regForm, jobTitle: e.target.value })}
                      placeholder="e.g. Systems Engineer"
                    />
                  </div>

                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input 
                      type="text" 
                      value={regForm.company}
                      onChange={(e) => setRegForm({ ...regForm, company: e.target.value })}
                      placeholder="e.g. TechCorp"
                    />
                  </div>
                </div>

                {regStatus.type === 'error' && (
                  <div className="reg-error-alert">
                    {regStatus.message}
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedConf(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={regLoading}>
                    {regLoading ? 'Processing...' : 'Claim Free Pass'}
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

export default Conferences;
