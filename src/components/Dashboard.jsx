import React, { useState, useEffect } from 'react';
import { getApplications } from '../api/applications';
import { getInterviews } from '../api/interviews';
import { getJobs } from '../api/jobs';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    scheduledInterviews: 0,
    activeJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [applications, interviews, jobs] = await Promise.all([
        getApplications(),
        getInterviews(),
        getJobs()
      ]);

      setStats({
        totalApplications: applications.length,
        pendingApplications: applications.filter(app => app.status === 'Under Review').length,
        scheduledInterviews: interviews.filter(int => int.status === 'Scheduled').length,
        activeJobs: jobs.filter(job => job.status === 'Active').length
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-value">{stats.totalApplications}</p>
          <p className="stat-label">All time</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <p className="stat-value">{stats.pendingApplications}</p>
          <p className="stat-label">Under Review</p>
        </div>
        
        <div className="stat-card">
          <h3>Scheduled Interviews</h3>
          <p className="stat-value">{stats.scheduledInterviews}</p>
          <p className="stat-label">Upcoming</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Jobs</h3>
          <p className="stat-value">{stats.activeJobs}</p>
          <p className="stat-label">Currently Open</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <i className="fas fa-plus"></i>
            Post New Job
          </button>
          <button className="action-btn">
            <i className="fas fa-search"></i>
            Search Candidates
          </button>
          <button className="action-btn">
            <i className="fas fa-calendar"></i>
            Schedule Interview
          </button>
          <button className="action-btn">
            <i className="fas fa-file-alt"></i>
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 