import React from 'react';
import { Shield, Truck, Award, Hammer } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <header className="about-hero text-center">
          <span className="section-tag">Our Legacy</span>
          <h1>Engineered Art</h1>
          <p className="subtitle">From the track to your wall. We immortalize automotive engineering through premium 3D frames and bespoke digital edits.</p>
        </header>

        <section className="about-story-grid">
          <div className="story-image-placeholder glass-panel">
            <div className="image-overlay-content">
              <div className="est-tag">EST. 2024</div>
            </div>
          </div>
          <div className="story-content">
            <span className="section-tag">The Story</span>
            <h2>Driven by Detail</h2>
            <p>Piston Wall was born in a Detroit garage, fueled by a singular obsession: why should automotive beauty be confined to the road? We believed that the intricate details of a Porsche flat-six or the aggressive lines of a Nissan GT-R deserved a place of honor in every enthusiast's home.</p>
            <p>What started as a personal project to frame my first 1:24 scale model evolved into a specialized workshop dedicated to the art of the car. Today, our team of artists and detailers hand-assembles each frame with museum-grade precision.</p>
          </div>
        </section>

        <section className="craftsmanship-section">
          <div className="text-center">
            <span className="section-tag">Quality Control</span>
            <h2 className="section-title">The Showroom Standard</h2>
          </div>

          <div className="craft-grid">
            <div className="craft-card glass-panel">
              <div className="craft-icon-container">
                <Hammer size={28} />
              </div>
              <h3>Hand-Built</h3>
              <p>Every diecast model is meticulously inspected and mounted by hand using specialized non-reactive adhesives.</p>
            </div>

            <div className="craft-card glass-panel">
              <div className="craft-icon-container">
                <Shield size={28} />
              </div>
              <h3>Museum Quality</h3>
              <p>We use premium carbon fiber backings and anti-reflective acrylic to ensure your piece looks perfect in any light.</p>
            </div>

            <div className="craft-card glass-panel">
              <div className="craft-icon-container">
                <Award size={28} />
              </div>
              <h3>Serial Authenticity</h3>
              <p>Each collector piece is numbered and issued with a digital certificate of authenticity stored in our vault.</p>
            </div>

            <div className="craft-card glass-panel">
              <div className="craft-icon-container">
                <Truck size={28} />
              </div>
              <h3>Vault Shipping</h3>
              <p>Our custom-engineered reinforcement crates guarantee your acquisition arrives in pristine showroom condition.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
