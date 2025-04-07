import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faCalendar, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import JobPostings from './JobPostings';
import CandidateSearch from './CandidateSearch';
import InterviewsSection from './InterviewsSection';
import RecruiterProfile from './RecruiterProfile';
import '../styles/RecruiterPortal.css';

const RecruiterPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobPostings />;
      case 'candidates':
        return <CandidateSearch />;
      case 'interviews':
        return <InterviewsSection />;
      case 'profile':
        return <RecruiterProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="recruiter-portal">
      <div className="portal-header">
        <h1>Recruiter Portal</h1>
        <div className="user-info">
          <span className="welcome-text">Welcome, Recruiter</span>
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
              className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              Job Postings
            </button>
            <button 
              className={`nav-item ${activeTab === 'candidates' ? 'active' : ''}`}
              onClick={() => setActiveTab('candidates')}
            >
              Candidate Search
            </button>
            <button 
              className={`nav-item ${activeTab === 'interviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('interviews')}
            >
              Interviews
            </button>
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RecruiterPortal; 