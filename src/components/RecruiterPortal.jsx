import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faCalendar, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import RecruiterProfile from './RecruiterProfile';
import Jobs from './Jobs';
import Interviews from './Interviews';
import CandidateSearch from './CandidateSearch';
import Applications from './Applications';
import '../styles/RecruiterPortal.css';

const RecruiterPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <RecruiterProfile />;
      case 'jobs':
        return <Jobs />;
      case 'interviews':
        return <Interviews />;
      case 'candidates':
        return <CandidateSearch />;
      case 'applications':
        return <Applications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="recruiter-portal">
      <aside className="sidebar">
        <div className="logo">
          <h2>Recruiter Portal</h2>
        </div>
        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>My Profile</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Jobs</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'interviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            <FontAwesomeIcon icon={faCalendar} />
            <span>Interviews</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Candidate Pool</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Applications</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default RecruiterPortal; 