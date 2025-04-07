import React, { useState, useEffect } from 'react';
import { getJobs } from '../api/jobs';
import '../styles/JobPostings.css';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="job-postings">
      <h2>Job Postings</h2>
      {jobs.length === 0 ? (
        <div className="no-jobs">No job postings available</div>
      ) : (
        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-details">
                <p><i className="fas fa-building"></i> {job.department}</p>
                <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                <p><i className="fas fa-clock"></i> Posted {new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="job-description">
                <p>{job.description}</p>
              </div>
              <div className="job-actions">
                <button className="view-btn">View Details</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostings; 