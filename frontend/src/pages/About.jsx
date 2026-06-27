import React from 'react';
import { ShieldCheck, Compass, Users, Sparkles, MapPin } from 'lucide-react';
import './About.css';

const About = () => {
  const offices = [
    { name: 'Bentonville', state: 'Arkansas', country: 'United States', desc: 'Walmart World Headquarters - the home of core platform infrastructure and supply chain operations.' },
    { name: 'Sunnyvale & San Bruno', state: 'California', country: 'United States', desc: 'Digital Commerce, AI Labs, and Customer Experience Engineering centers.' },
    { name: 'Bangalore & Chennai', state: 'Tamil Nadu & Karnataka', country: 'India', desc: 'Our massive global delivery centers managing logistics, cybersecurity, and data intelligence at scale.' },
    { name: 'Mexico City', state: 'DF', country: 'Mexico', desc: 'Engineering teams designing localized retail platforms for Walmart de México y Centroamérica.' }
  ];

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container about-hero-content animate-slide-up">
          <span className="pseudo-code">{"{ company.mission(); }"}</span>
          <h1>Our Tech. Your Potential. Better Together.</h1>
          <p>We are a division of Walmart, powering the world’s largest retailer through technology. We write the software that handles billions of interactions, optimizing logistics grids, store architectures, and digital checkout points worldwide.</p>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="about-values section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>The Code We Live By</h2>
            <p>Our values aren't just posters on walls; they are embedded in our architecture reviews, project guidelines, and pull requests.</p>
          </div>

          <div className="grid-2 values-grid">
            <div className="value-item">
              <ShieldCheck className="value-icon" size={32} />
              <div>
                <h3>Integrity & Trust</h3>
                <p>We build secure, private, and resilient systems. Trust is our primary product, and we safeguard candidate data, shopping habits, and enterprise integrity at every tier.</p>
              </div>
            </div>

            <div className="value-item">
              <Compass className="value-icon" size={32} />
              <div>
                <h3>Service to the Customer</h3>
                <p>We build code to make shopping cheaper, faster, and more convenient. Saving customers money helps them live better, whether online or inside physical stores.</p>
              </div>
            </div>

            <div className="value-item">
              <Users className="value-icon" size={32} />
              <div>
                <h3>Respect for the Individual</h3>
                <p>We believe in developer autonomy, remote flexibility, and collaborative reviews. We actively value the contribution of every engineer, from intern to principal architect.</p>
              </div>
            </div>

            <div className="value-item">
              <Sparkles className="value-icon" size={32} />
              <div>
                <h3>Striving for Excellence</h3>
                <p>We continuously optimize cache ratios, load-balancing limits, and model accuracy. We iterate quickly, learn from bugs, and celebrate successful deployments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footprint */}
      <section className="about-footprint section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>Our Global Footprint</h2>
            <p>We operate from state-of-the-art tech hubs around the globe, collaborating across time zones to create borderless retail pipelines.</p>
          </div>

          <div className="grid-2 offices-grid">
            {offices.map((office, idx) => (
              <div className="office-card" key={idx}>
                <div className="office-card-header">
                  <MapPin className="pin-icon" />
                  <h3>{office.name}</h3>
                </div>
                <span className="office-location">{office.state}, {office.country}</span>
                <p className="office-desc">{office.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
