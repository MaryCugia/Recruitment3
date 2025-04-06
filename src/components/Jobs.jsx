import React, { useState, useEffect } from 'react';
import { getJobs } from '../api/jobs';
import '../styles/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="jobs">
      <div className="jobs-header">
        <h2>Job Postings</h2>
        <button className="new-job-btn">
          <i className="fas fa-plus"></i>
          Post New Job
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className={`status-badge ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            
            <div className="job-details">
              <div className="detail-item">
                <span className="label">Department:</span>
                <span className="value">{job.department}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">{job.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">Type:</span>
                <span className="value">{job.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Posted:</span>
                <span className="value">{job.postedDate}</span>
              </div>
            </div>

            <div className="job-description">
              <p>{job.description}</p>
            </div>

            <div className="job-actions">
              <button className="edit-btn">Edit</button>
              <button className="view-applicants-btn">View Applicants</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs; 