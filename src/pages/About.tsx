import { Hammer, Paintbrush, ShieldCheck } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page container">
      {/* Hero Section */}
      <section className="about-hero text-center">
        <h1>Our Passion, <span className="accent-text">Your Wall</span></h1>
        <p className="subtitle">Born from a love of internal combustion, speed, and design. We turn automotive engineering into timeless wall art.</p>
      </section>

      {/* Story Section */}
      <section className="about-story-grid">
        <div className="story-content">
          <h2>The Piston Wall Story</h2>
          <p>We believe that cars are more than just a way to get from Point A to Point B. They are expressions of engineering genius, sculptural design, and personal freedom. Every modification, every curve, and every exhaust note tells a story.</p>
          <p>Piston Wall was founded in a small garage by a group of car enthusiasts who wanted to immortalize their builds. Standard posters felt flat, and raw scale models got dusty on shelves. We wanted something premium—art that commanded the room. Thus, our signature 3D Diecast Car Frames were born.</p>
        </div>
        <div className="story-image-placeholder glass-panel">
          <div className="image-overlay-content">
            <span className="est-tag">EST. 2024</span>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="craftsmanship">
        <h2 className="text-center section-title">Crafted Without Compromise</h2>
        
        <div className="craft-grid">
          <div className="craft-card glass-panel">
            <div className="craft-icon-container">
              <Hammer size={32} />
            </div>
            <h3>Meticulous Assembly</h3>
            <p>Every 1:24 and 1:18 scale model is precisely inspected, detailed, and mounted using custom hardware. We ensure the stance is perfect before sealing the frame.</p>
          </div>

          <div className="craft-card glass-panel">
            <div className="craft-icon-container">
              <Paintbrush size={32} />
            </div>
            <h3>Premium Materials</h3>
            <p>We use matte-finish carbon fiber backboards, high-grade museum glass, and real wood shadow box frames. No cheap plastics, no flimsy mounts.</p>
          </div>

          <div className="craft-card glass-panel">
            <div className="craft-icon-container">
              <ShieldCheck size={32} />
            </div>
            <h3>Custom Created</h3>
            <p>For custom edits, our digital artists match every detail of your car—down to the exact wheels, aftermarket wings, and custom wrap color.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
