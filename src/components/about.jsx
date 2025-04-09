import React from 'react';
import '../styles/About.css';

const About = () => {
  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithms match candidates with the perfect job opportunities based on skills, experience, and cultural fit.",
      icon: "fa-robot"
    },
    {
      title: "Streamlined Process",
      description: "Simplify your recruitment process with automated scheduling, interview management, and candidate tracking.",
      icon: "fa-tasks"
    },
    {
      title: "Data-Driven Insights",
      description: "Make informed decisions with comprehensive analytics and reporting tools for your recruitment process.",
      icon: "fa-chart-line"
    },
    {
      title: "Enhanced Communication",
      description: "Stay connected with candidates and team members through our integrated communication platform.",
      icon: "fa-comments"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "https://via.placeholder.com/150",
      bio: "With over 15 years of experience in HR technology, Sarah leads our mission to revolutionize recruitment."
    },
    {
      name: "Michael Chen",
      position: "CTO",
      image: "https://via.placeholder.com/150",
      bio: "Michael brings his expertise in AI and machine learning to power our matching algorithms."
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Product",
      image: "https://via.placeholder.com/150",
      bio: "Emily ensures our platform meets the needs of both recruiters and candidates."
    },
    {
      name: "David Kim",
      position: "Head of Customer Success",
      image: "https://via.placeholder.com/150",
      bio: "David leads our team in providing exceptional support to our users."
    }
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Us</h1>
        <p className="hero-subtitle">Transforming Recruitment with AI Technology</p>
      </div>
      
      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p className="mission-text">
            We are dedicated to revolutionizing the recruitment process by leveraging artificial intelligence 
            to create meaningful connections between talented professionals and forward-thinking companies. 
            Our platform simplifies hiring while ensuring the best matches for both candidates and employers.
          </p>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <p className="team-intro">
            Meet the passionate individuals behind our platform, working together to transform recruitment.
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <p>Email: contact@fairHire.com</p>
            </div>
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              <p>Phone: (+254) 756-545-643</p>
            </div>
            <div className="contact-method">
              <i className="fas fa-map-marker-alt"></i>
              <p>Address: </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
