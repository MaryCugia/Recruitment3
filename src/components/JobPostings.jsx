import React, { useState, useEffect } from 'react';
import { getJobs, createJob } from '../api/jobs';
import '../styles/JobPostings.css';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    responsibilities: [''],
    salary: '',
    benefits: ['']
  });

  useEffect(() => {
    fetchJobs();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e, field, index) => {
    const { value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setNewJob(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdJob = await createJob(newJob);
      setJobs(prev => [...prev, createdJob]);
      setShowForm(false);
      setNewJob({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: [''],
        responsibilities: [''],
        salary: '',
        benefits: ['']
      });
    } catch (err) {
      console.error('Error creating job:', err);
      setError('Failed to create job');
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="job-postings">
      <div className="job-postings-header">
        <h2>Job Postings</h2>
        <button 
          className="post-job-btn"
          onClick={() => setShowForm(true)}
        >
          Post New Job
        </button>
      </div>

      {showForm && (
        <div className="job-form-container">
          <form onSubmit={handleSubmit} className="job-form">
            <h3>Create New Job Posting</h3>
            
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newJob.department}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="type"
                value={newJob.type}
                onChange={handleInputChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Requirements</label>
              {newJob.requirements.map((req, index) => (
                <input
                  key={index}
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayInputChange(e, 'requirements', index)}
                  required
                />
              ))}
              <button type="button" onClick={() => addArrayItem('requirements')}>
                Add Requirement
              </button>
            </div>

            <div className="form-group">
              <label>Responsibilities</label>
              {newJob.responsibilities.map((resp, index) => (
                <input
                  key={index}
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayInputChange(e, 'responsibilities', index)}
                  required
                />
              ))}
              <button type="button" onClick={() => addArrayItem('responsibilities')}>
                Add Responsibility
              </button>
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={newJob.salary}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Benefits</label>
              {newJob.benefits.map((benefit, index) => (
                <input
                  key={index}
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayInputChange(e, 'benefits', index)}
                  required
                />
              ))}
              <button type="button" onClick={() => addArrayItem('benefits')}>
                Add Benefit
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Create Job</button>
              <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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