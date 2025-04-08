import React, { useState } from 'react';
import { createJob } from '../api/jobs';
import '../styles/RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 12,
    newApplications: 24,
    upcomingInterviews: 8,
    totalCandidates: 156
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'application',
      title: 'New application received for Senior Developer position',
      time: '2 hours ago',
      candidate: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled with Michael Chen',
      time: '4 hours ago',
      candidate: 'Michael Chen'
    },
    {
      id: 3,
      type: 'job',
      title: 'New job posting published: UX Designer',
      time: '1 day ago',
      position: 'UX Designer'
    }
  ]);

  // State for modals
  const [activeModal, setActiveModal] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: ''
  });
  const [interviewForm, setInterviewForm] = useState({
    candidate: '',
    position: '',
    date: '',
    time: '',
    type: 'Virtual',
    location: ''
  });
  const [searchForm, setSearchForm] = useState({
    keywords: '',
    location: '',
    experience: '',
    skills: ''
  });

  const handleQuickAction = (action) => {
    setActiveModal(action);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJob(jobForm);
      console.log('Job created successfully:', newJob);
      
      // Update the stats
      setStats((prevStats) => ({
        ...prevStats,
        activeJobs: prevStats.activeJobs + 1,
      }));
  

      // Add to recent activity
      setRecentActivity(prevActivity => [
        {
          id: Date.now(),
          type: 'job',
          title: `New job posting published: ${jobForm.title}`,
          time: 'Just now',
          position: jobForm.title
        },
        ...prevActivity
      ]);

      // Reset form and close modal
      setJobForm({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: ''
      });
      setActiveModal(null);
    } catch (error) {
      console.error('Error creating job:', error);
      // Here you would typically show an error message to the user
    }
  };

  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to schedule the interview
    console.log('Scheduling interview:', interviewForm);
    // Reset form and close modal
    setInterviewForm({
      candidate: '',
      position: '',
      date: '',
      time: '',
      type: 'Virtual',
      location: ''
    });
    setActiveModal(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to search candidates
    console.log('Searching candidates:', searchForm);
    // Reset form and close modal
    setSearchForm({
      keywords: '',
      location: '',
      experience: '',
      skills: ''
    });
    setActiveModal(null);
  };

  return (
    <div className="recruiter-dashboard">
      {/* Statistics Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h3>Active Jobs</h3>
            <p className="stat-number">{stats.activeJobs}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="stat-info">
            <h3>New Applications</h3>
            <p className="stat-number">{stats.newApplications}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h3>Upcoming Interviews</h3>
            <p className="stat-number">{stats.upcomingInterviews}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Candidates</h3>
            <p className="stat-number">{stats.totalCandidates}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'application' && <i className="fas fa-file-alt"></i>}
                {activity.type === 'interview' && <i className="fas fa-calendar-alt"></i>}
                {activity.type === 'job' && <i className="fas fa-briefcase"></i>}
              </div>
              <div className="activity-content">
                <p className="activity-title">{activity.title}</p>
                {activity.candidate && (
                  <p className="activity-detail">Candidate: {activity.candidate}</p>
                )}
                {activity.position && (
                  <p className="activity-detail">Position: {activity.position}</p>
                )}
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('postJob')}
          >
            <i className="fas fa-plus"></i>
            Post New Job
          </button>
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('searchCandidates')}
          >
            <i className="fas fa-search"></i>
            Search Candidates
          </button>
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('scheduleInterview')}
          >
            <i className="fas fa-calendar-plus"></i>
            Schedule Interview
          </button>
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('viewReports')}
          >
            <i className="fas fa-chart-pie"></i>
            View Reports
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'postJob' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Post New Job</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleJobSubmit} className="modal-form">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={jobForm.department}
                  onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'scheduleInterview' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule Interview</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleInterviewSubmit} className="modal-form">
              <div className="form-group">
                <label>Candidate</label>
                <input
                  type="text"
                  value={interviewForm.candidate}
                  onChange={(e) => setInterviewForm({...interviewForm, candidate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={interviewForm.position}
                  onChange={(e) => setInterviewForm({...interviewForm, position: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={interviewForm.time}
                  onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Interview Type</label>
                <select
                  value={interviewForm.type}
                  onChange={(e) => setInterviewForm({...interviewForm, type: e.target.value})}
                  required
                >
                  <option value="Virtual">Virtual</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              {interviewForm.type === 'In-person' && (
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={interviewForm.location}
                    onChange={(e) => setInterviewForm({...interviewForm, location: e.target.value})}
                    required
                  />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'searchCandidates' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Search Candidates</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="modal-form">
              <div className="form-group">
                <label>Keywords</label>
                <input
                  type="text"
                  value={searchForm.keywords}
                  onChange={(e) => setSearchForm({...searchForm, keywords: e.target.value})}
                  placeholder="e.g., Java, React, Project Management"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={searchForm.location}
                  onChange={(e) => setSearchForm({...searchForm, location: e.target.value})}
                  placeholder="City, State, or Remote"
                />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select
                  value={searchForm.experience}
                  onChange={(e) => setSearchForm({...searchForm, experience: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  value={searchForm.skills}
                  onChange={(e) => setSearchForm({...searchForm, skills: e.target.value})}
                  placeholder="Comma-separated skills"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard; 