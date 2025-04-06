import React, { useState } from 'react';
import '../styles/JobSearchSection.css';

const JobSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
    industry: ''
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      experience: '5+ years',
      salary: 'KSh 250,000 - 350,000',
      postedDate: '2024-03-15',
      description: 'We are looking for a Senior Software Engineer to join our team...',
      requirements: [
        '5+ years of experience in software development',
        'Strong knowledge of JavaScript/TypeScript',
        'Experience with React and Node.js',
        'Excellent problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Digital Innovations',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      experience: '3+ years',
      salary: 'KSh 200,000 - 300,000',
      postedDate: '2024-03-14',
      description: 'Join our team as a Product Manager to lead our product development...',
      requirements: [
        '3+ years of product management experience',
        'Strong analytical and strategic thinking',
        'Excellent communication skills',
        'Experience with agile methodologies'
      ]
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Tech',
      location: 'Nairobi, Kenya',
      type: 'Contract',
      experience: '2+ years',
      salary: 'KSh 150,000 - 250,000',
      postedDate: '2024-03-13',
      description: 'We are seeking a talented UX/UI Designer to create beautiful and functional interfaces...',
      requirements: [
        '2+ years of UX/UI design experience',
        'Proficiency in Figma or Adobe XD',
        'Strong portfolio of design work',
        'Understanding of user-centered design principles'
      ]
    }
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

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
    // This will be implemented when we add the backend
    console.log('Applying for job:', jobId);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (!filters.location || job.location === filters.location) &&
                          (!filters.experience || job.experience === filters.experience) &&
                          (!filters.jobType || job.type === filters.jobType) &&
                          (!filters.industry || job.industry === filters.industry);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="job-search-section">
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
            <option value="Mombasa, Kenya">Mombasa</option>
            <option value="Kisumu, Kenya">Kisumu</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Experience</label>
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">All Experience Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
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
        <div className="filter-group">
          <label>Industry</label>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>

      <div className="jobs-list">
        {filteredJobs.map(job => (
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
                <span className="label">Experience:</span>
                <span className="value">{job.experience}</span>
              </div>
              <div className="detail-item">
                <span className="label">Salary:</span>
                <span className="value">{job.salary}</span>
              </div>
              <div className="detail-item">
                <span className="label">Posted:</span>
                <span className="value">{job.postedDate}</span>
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
            </div>
          </div>
        ))}
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
                    <span className="experience">{selectedJob.experience}</span>
                  </div>
                </div>
                <div className="salary-info">
                  <span className="salary">{selectedJob.salary}</span>
                  <span className="posted">Posted: {selectedJob.postedDate}</span>
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
                className="apply-btn"
                onClick={() => handleApply(selectedJob.id)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchSection; 