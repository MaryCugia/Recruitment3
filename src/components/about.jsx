import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/About.css';

const About = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await api.get('/about');
        setAboutContent(response.data);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      
      <div className="about-content">
        <section className="mission-section">
          <h2>{aboutContent?.mission?.title || 'Our Mission'}</h2>
          <p>{aboutContent?.mission?.content}</p>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            {aboutContent?.features?.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {aboutContent?.team?.length > 0 && (
          <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              {aboutContent.team.map((member, index) => (
                <div key={index} className="team-member">
                  <img src={member.image} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                  <p>{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>Email: {aboutContent?.contact?.email}</p>
            <p>Phone: {aboutContent?.contact?.phone}</p>
            {aboutContent?.contact?.address && (
              <p>Address: {aboutContent.contact.address}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
