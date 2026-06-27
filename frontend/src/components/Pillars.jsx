import React from 'react';
import { Target, Users, Zap, Award } from 'lucide-react';
import './Pillars.css';

const Pillars = () => {
  const pillarsList = [
    {
      icon: <Target className="pillar-icon" />,
      title: 'Our Scale',
      subtitle: 'Global Impact',
      desc: 'We design tech solutions that power transactions for over 240 million customers every single week across 10,500 stores.'
    },
    {
      icon: <Users className="pillar-icon" />,
      title: 'Our Culture',
      subtitle: 'Inclusive Ecosystem',
      desc: 'A community where code meets culture. We believe in collaborative development, continuous mentoring, and diverse perspectives.'
    },
    {
      icon: <Zap className="pillar-icon" />,
      title: 'Our Innovation',
      subtitle: 'Emerging Arenas',
      desc: 'From deploying reinforcement learning models to robotic system pipelines, we operate at the bleeding edge of smart enterprise.'
    },
    {
      icon: <Award className="pillar-icon" />,
      title: 'Our Opportunity',
      subtitle: 'Career Trajectories',
      desc: 'Your growth is our fuel. We provide cross-functional transitions, tech guilds, and training programs to elevate your talent.'
    }
  ];

  return (
    <section className="pillars-section" id="pillars">
      <div className="container">
        <div className="pillars-heading-wrap">
          <span className="pseudo-code">{"{ Innovation.Retail(human); }"}</span>
          <h2 className="pillars-title">The Foundation of Our Technology</h2>
          <p className="pillars-subtitle">We are rewriting the rules of commerce by bridging scalable software architectures with human-centered solutions.</p>
        </div>

        <div className="grid-4 pillars-grid">
          {pillarsList.map((pillar, idx) => (
            <div className="pillar-card" key={idx}>
              <div className="pillar-icon-wrap">
                {pillar.icon}
              </div>
              <span className="pillar-card-sub">{pillar.subtitle}</span>
              <h3 className="pillar-card-title">{pillar.title}</h3>
              <p className="pillar-card-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
