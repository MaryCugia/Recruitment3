import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import ResumeSection from './ResumeSection';
import ApplicationsSection from './ApplicationsSection';
import JobSearchSection from './JobSearchSection';
import '../styles/CandidatePortal.css';

const CandidatePortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="candidate-portal">
      <div className="portal-header">
        <h1>Candidate Portal</h1>
        <div className="user-info">
          <span className="welcome-text">Welcome, Candidate</span>
          <button className="profile-btn" onClick={handleProfileClick}>My Profile</button>
        </div>
      </div>

      <div className="portal-content">
        <div className="sidebar">
          <nav className="portal-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => setActiveTab('resume')}
            >
              Resume Management
            </button>
            <button 
              className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              My Applications
            </button>
            <button 
              className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              Job Search
            </button>
            <button 
              className={`nav-item ${activeTab === 'interviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('interviews')}
            >
              Interviews
            </button>
          </nav>
        </div>

        <div className="main-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Active Applications</h3>
                  <p className="stat-number">5</p>
                </div>
                <div className="stat-card">
                  <h3>Upcoming Interviews</h3>
                  <p className="stat-number">2</p>
                </div>
                <div className="stat-card">
                  <h3>Profile Completion</h3>
                  <p className="stat-number">85%</p>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-date">Today</span>
                    <p>Application submitted for Software Engineer position at TechCorp</p>
                  </div>
                  <div className="activity-item">
                    <span className="activity-date">Yesterday</span>
                    <p>Interview scheduled for Product Manager role at Innovate Ltd</p>
                  </div>
                </div>
              </div>

              <div className="recommended-jobs">
                <h2>Recommended Jobs</h2>
                <div className="jobs-grid">
                  <div className="job-card">
                    <h3>Senior Developer</h3>
                    <p className="company">Tech Solutions Inc</p>
                    <p className="location">Nairobi, Kenya</p>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                  <div className="job-card">
                    <h3>Product Manager</h3>
                    <p className="company">Digital Innovations</p>
                    <p className="location">Nairobi, Kenya</p>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileSection />}

          {activeTab === 'resume' && <ResumeSection />}

          {activeTab === 'applications' && <ApplicationsSection />}

          {activeTab === 'jobs' && <JobSearchSection />}

          {activeTab === 'interviews' && (
            <div className="interviews-section">
              <h2>Interviews</h2>
              {/* Interviews content will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;