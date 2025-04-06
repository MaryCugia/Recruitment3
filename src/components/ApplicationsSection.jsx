import React, { useState } from 'react';
import '../styles/ApplicationsSection.css';

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc',
      location: 'Nairobi, Kenya',
      appliedDate: '2024-03-15',
      status: 'Under Review',
      lastUpdated: '2024-03-16',
      interviewDate: '2024-03-25',
      notes: 'Technical interview scheduled'
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'Digital Innovations',
      location: 'Nairobi, Kenya',
      appliedDate: '2024-03-10',
      status: 'Interview Scheduled',
      lastUpdated: '2024-03-12',
      interviewDate: '2024-03-20',
      notes: 'First round interview completed'
    },
    {
      id: 3,
      jobTitle: 'Full Stack Developer',
      company: 'WebTech Kenya',
      location: 'Nairobi, Kenya',
      appliedDate: '2024-03-05',
      status: 'Rejected',
      lastUpdated: '2024-03-08',
      notes: 'Position filled internally'
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return 'status-review';
      case 'interview scheduled':
        return 'status-interview';
      case 'rejected':
        return 'status-rejected';
      case 'accepted':
        return 'status-accepted';
      default:
        return 'status-default';
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
  };

  return (
    <div className="applications-section">
      <div className="section-header">
        <h2>My Applications</h2>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Total Applications</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {applications.filter(app => app.status === 'Under Review').length}
            </span>
            <span className="stat-label">Under Review</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {applications.filter(app => app.status === 'Interview Scheduled').length}
            </span>
            <span className="stat-label">Interviews</span>
          </div>
        </div>
      </div>

      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="job-info">
                <h3>{application.jobTitle}</h3>
                <p className="company">{application.company}</p>
                <p className="location">{application.location}</p>
              </div>
              <div className={`status-badge ${getStatusColor(application.status)}`}>
                {application.status}
              </div>
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
              {application.interviewDate && (
                <div className="detail-item">
                  <span className="label">Interview:</span>
                  <span className="value">{application.interviewDate}</span>
                </div>
              )}
            </div>

            <div className="application-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => handleViewDetails(application)}
              >
                View Details
              </button>
              {application.status === 'Interview Scheduled' && (
                <button className="action-btn interview-btn">
                  View Interview Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedApplication && (
        <div className="application-details-modal">
          <div className="modal-overlay" onClick={handleCloseDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedApplication.jobTitle}</h2>
              <button className="close-btn" onClick={handleCloseDetails}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-group">
                <h3>Application Details</h3>
                <div className="detail-item">
                  <span className="label">Company:</span>
                  <span className="value">{selectedApplication.company}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span className="value">{selectedApplication.location}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Applied Date:</span>
                  <span className="value">{selectedApplication.appliedDate}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className={`value ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>

              {selectedApplication.interviewDate && (
                <div className="detail-group">
                  <h3>Interview Information</h3>
                  <div className="detail-item">
                    <span className="label">Interview Date:</span>
                    <span className="value">{selectedApplication.interviewDate}</span>
                  </div>
                </div>
              )}

              <div className="detail-group">
                <h3>Notes</h3>
                <p className="notes">{selectedApplication.notes}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="close-btn" onClick={handleCloseDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsSection; 