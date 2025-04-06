import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FairHire AI</h1>
          <p className="hero-subtitle">Revolutionizing Recruitment with Fair and Transparent AI</p>
          <div className="hero-buttons">
            <Link to="/register" className="cta-button primary">Get Started</Link>
            <Link to="/about" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Transparent AI</h3>
            <p>Understand how decisions are made with our explainable AI system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Bias-Free Hiring</h3>
            <p>Advanced algorithms designed to eliminate unconscious bias</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Local Market Focus</h3>
            <p>Tailored to Nairobi's unique job market and requirements</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Register and set up your professional profile</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Your Resume</h3>
            <p>Our AI system analyzes your skills and experience</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Matched</h3>
            <p>Receive fair and unbiased job recommendations</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Experience Fair Hiring?</h2>
        <p>Join us in creating a more equitable job market</p>
        <Link to="/register" className="cta-button primary">Start Your Journey</Link>
      </section>
    </div>
  );
};

export default Home; 