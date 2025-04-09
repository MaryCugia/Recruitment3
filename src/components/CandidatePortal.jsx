import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import ResumeSection from './ResumeSection';
import ApplicationsSection from './ApplicationsSection';
import JobSearchSection from './JobSearchSection';
import AIInsights from './AIInsights';
import '../styles/CandidatePortal.css';
import jobsData from '../mockData/jobsData';

const CandidatePortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchJobs = () => {
      // Simulate loading delay
      setTimeout(() => {
        setJobs(jobsData);
      }, 500);
    };

    fetchJobs();
  }, []);

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const handleJobSelect = (jobId) => {
    setSelectedJob(jobId);
    setActiveTab('insights');
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
            <button 
              className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              AI Insights
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
                  {jobs.slice(0, 2).map(job => (
                    <div key={job.id} className="job-card">
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                      <p className="location">{job.location}</p>
                      <button className="apply-btn" onClick={() => handleJobSelect(job.id)}>View Match</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileSection />}

          {activeTab === 'resume' && <ResumeSection />}

          {activeTab === 'applications' && <ApplicationsSection />}

          {activeTab === 'jobs' && <JobSearchSection jobs={jobs} onJobSelect={handleJobSelect} />}

          {activeTab === 'interviews' && (
            <div className="interviews-section">
              <h2>Interviews</h2>
              <p>You currently have no scheduled interviews.</p>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="insights-section">
              <h2>AI Match Insights</h2>
              <p className="insights-description">
                Get detailed insights about how your profile matches with job requirements
                and receive personalized recommendations for improvement.
              </p>
              {selectedJob ? (
                <AIInsights jobId={selectedJob} />
              ) : (
                <div className="select-job-prompt">
                  <p>Please select a job to view AI insights</p>
                  <div className="job-list">
                    {jobs.map(job => (
                      <div 
                        key={job.id} 
                        className="job-card"
                        onClick={() => handleJobSelect(job.id)}
                      >
                        <h3>{job.title}</h3>
                        <p className="company">{job.company}</p>
                        <p className="location">{job.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;