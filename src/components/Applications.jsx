import React, { useState, useEffect } from 'react';
import { getApplications, searchApplications, updateApplicationStatus } from '../api/applications';
import '../styles/Applications.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    jobTitle: '',
    candidateName: ''
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error('Error loading applications:', err);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await searchApplications(filters);
      setApplications(results);
    } catch (err) {
      console.error('Error searching applications:', err);
      setError('Failed to search applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      await updateApplicationStatus(id, newStatus);
      await fetchApplications(); // Refresh the list
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading && applications.length === 0) {
    return <div className="loading">Loading applications...</div>;
  }

  return (
    <div className="applications">
      <div className="applications-header">
        <h2>Job Applications</h2>
        <div className="search-filters">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
          <input
            type="text"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleFilterChange}
            placeholder="Search by job title"
            className="filter-input"
          />
          <input
            type="text"
            name="candidateName"
            value={filters.candidateName}
            onChange={handleFilterChange}
            placeholder="Search by candidate name"
            className="filter-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="applications-grid">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <h3>{application.jobTitle}</h3>
              <span className={`status-badge ${application.status.toLowerCase().replace(' ', '-')}`}>
                {application.status}
              </span>
            </div>
            
            <div className="candidate-info">
              <h4>{application.candidateName}</h4>
              <p>{application.candidateTitle}</p>
              <p className="location">
                <i className="fas fa-map-marker-alt"></i> {application.location}
              </p>
            </div>

            <div className="application-details">
              <div className="detail-item">
                <span className="label">Applied:</span>
                <span className="value">{application.appliedDate}</span>
              </div>
              <div className="detail-item">
                <span className="label">Last Updated:</span>
                <span className="value">{application.lastUpdated}</span>
              </div>
              <div className="detail-item">
                <span className="label">Experience:</span>
                <span className="value">{application.experience}</span>
              </div>
            </div>

            <div className="skills">
              {application.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>

            <div className="application-actions">
              <select
                value={application.status}
                onChange={(e) => handleStatusChange(application.id, e.target.value)}
                className="status-select"
              >
                <option value="Under Review">Under Review</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
              <button className="view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && !loading && (
        <div className="no-results">No applications found</div>
      )}
    </div>
  );
};

export default Applications; 