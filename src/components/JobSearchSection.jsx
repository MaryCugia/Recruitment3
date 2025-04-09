import React, { useState, useEffect } from 'react';
import '../styles/JobSearchSection.css';

const JobSearchSection = ({ jobs = [], onJobSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  useEffect(() => {
    // Set loading to false when jobs are available
    if (jobs.length > 0) {
      setLoading(false);
    }
  }, [jobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleCloseDetails = () => {
    setShowJobDetails(false);
    setSelectedJob(null);
  };

  const handleApply = (jobId) => {
    console.log('Applying for job:', jobId);
  };
  
  const handleViewInsights = (jobId) => {
    if (onJobSelect) {
      onJobSelect(jobId);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (!filters.location || job.location === filters.location) &&
                          (!filters.jobType || job.type === filters.jobType);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="job-search-section">
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <div>
          <div className="search-header">
            <h2>Job Search</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Nairobi, Kenya">Nairobi</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Job Type</label>
              <select
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="jobs-list">
            {filteredJobs.length === 0 ? (
              <div className="no-jobs">No jobs found matching your criteria</div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <div className="job-title">
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <div className="job-meta">
                      <span className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        {job.location}
                      </span>
                      <span className="type">{job.type}</span>
                    </div>
                  </div>
                  <div className="job-details">
                    <div className="detail-item">
                      <span className="label">Salary:</span>
                      <span className="value">{job.salary}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Posted:</span>
                      <span className="value">{job.posted}</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewJob(job)}
                    >
                      View Details
                    </button>
                    <button 
                      className="action-btn apply-btn"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </button>
                    <button 
                      className="action-btn insights-btn"
                      onClick={() => handleViewInsights(job.id)}
                    >
                      View AI Match
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {showJobDetails && selectedJob && (
            <div className="job-details-modal">
              <div className="modal-overlay" onClick={handleCloseDetails}></div>
              <div className="modal-content">
                <div className="modal-header">
                  <h2>{selectedJob.title}</h2>
                  <button className="close-btn" onClick={handleCloseDetails}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="job-info">
                    <div className="company-info">
                      <h3>{selectedJob.company}</h3>
                      <div className="meta-info">
                        <span className="location">
                          <i className="fas fa-map-marker-alt"></i>
                          {selectedJob.location}
                        </span>
                        <span className="type">{selectedJob.type}</span>
                      </div>
                    </div>
                    <div className="salary-info">
                      <span className="salary">{selectedJob.salary}</span>
                      <span className="posted">Posted: {selectedJob.posted}</span>
                    </div>
                  </div>

                  <div className="job-description">
                    <h3>Job Description</h3>
                    <p>{selectedJob.description}</p>
                  </div>

                  <div className="job-requirements">
                    <h3>Requirements</h3>
                    <ul>
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="close-btn" onClick={handleCloseDetails}>
                    Close
                  </button>
                  <button 
                    className="action-btn apply-btn"
                    onClick={() => handleApply(selectedJob.id)}
                  >
                    Apply Now
                  </button>
                  <button 
                    className="action-btn insights-btn"
                    onClick={() => {
                      handleViewInsights(selectedJob.id);
                      handleCloseDetails();
                    }}
                  >
                    View AI Match
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchSection; 