import React, { useState } from 'react';
import '../styles/InterviewsSection.css';

const InterviewsSection = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc',
      type: 'Technical Interview',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '60 minutes',
      interviewer: 'John Smith',
      status: 'upcoming',
      location: 'Virtual (Zoom)',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'Please prepare for system design questions and coding challenges',
      requirements: [
        'Laptop with development environment set up',
        'Stable internet connection',
        'Camera and microphone'
      ]
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'Digital Innovations',
      type: 'Behavioral Interview',
      date: '2024-03-18',
      time: '02:30 PM',
      duration: '45 minutes',
      interviewer: 'Sarah Johnson',
      status: 'completed',
      location: 'In-person',
      address: '123 Business Park, Nairobi',
      notes: 'Focus on product strategy and team management experience',
      feedback: 'Strong communication skills and relevant experience'
    },
    {
      id: 3,
      jobTitle: 'UX/UI Designer',
      company: 'Creative Tech',
      type: 'Portfolio Review',
      date: '2024-03-25',
      time: '11:00 AM',
      duration: '90 minutes',
      interviewer: 'Michael Brown',
      status: 'upcoming',
      location: 'Virtual (Google Meet)',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Be prepared to walk through 2-3 recent projects',
      requirements: [
        'Portfolio presentation',
        'Design process documentation',
        'Case studies'
      ]
    }
  ]);

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (interview) => {
    setSelectedInterview(interview);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedInterview(null);
    setShowDetails(false);
  };

  const handleReschedule = (interviewId) => {
    // This will be implemented when we add the backend
    console.log('Rescheduling interview:', interviewId);
  };

  const handleCancel = (interviewId) => {
    // This will be implemented when we add the backend
    console.log('Canceling interview:', interviewId);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'status-upcoming';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="interviews-section">
      <div className="section-header">
        <h2>Interviews</h2>
        <div className="interviews-summary">
          <div className="summary-card">
            <h3>Upcoming</h3>
            <p className="count">{interviews.filter(i => i.status === 'upcoming').length}</p>
          </div>
          <div className="summary-card">
            <h3>Completed</h3>
            <p className="count">{interviews.filter(i => i.status === 'completed').length}</p>
          </div>
        </div>
      </div>

      <div className="interviews-list">
        {interviews.map(interview => (
          <div key={interview.id} className="interview-card">
            <div className="interview-header">
              <div className="interview-info">
                <h3>{interview.jobTitle}</h3>
                <p className="company">{interview.company}</p>
                <span className={`status-badge ${getStatusClass(interview.status)}`}>
                  {interview.status}
                </span>
              </div>
              <div className="interview-meta">
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>{formatDate(interview.date)}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>{interview.time}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-user"></i>
                  <span>{interview.interviewer}</span>
                </div>
              </div>
            </div>
            <div className="interview-details">
              <div className="detail-item">
                <span className="label">Type:</span>
                <span className="value">{interview.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{interview.duration}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">{interview.location}</span>
              </div>
            </div>
            <div className="interview-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => handleViewDetails(interview)}
              >
                View Details
              </button>
              {interview.status === 'upcoming' && (
                <>
                  <button 
                    className="action-btn reschedule-btn"
                    onClick={() => handleReschedule(interview.id)}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="action-btn cancel-btn"
                    onClick={() => handleCancel(interview.id)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedInterview && (
        <div className="interview-details-modal">
          <div className="modal-overlay" onClick={handleCloseDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedInterview.jobTitle}</h2>
              <button className="close-btn" onClick={handleCloseDetails}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="interview-info">
                <div className="company-info">
                  <h3>{selectedInterview.company}</h3>
                  <div className="meta-info">
                    <span className="type">{selectedInterview.type}</span>
                    <span className="date">
                      <i className="fas fa-calendar"></i>
                      {formatDate(selectedInterview.date)}
                    </span>
                    <span className="time">
                      <i className="fas fa-clock"></i>
                      {selectedInterview.time}
                    </span>
                  </div>
                </div>
                <div className="interviewer-info">
                  <h4>Interviewer</h4>
                  <p>{selectedInterview.interviewer}</p>
                </div>
              </div>

              <div className="location-info">
                <h3>Location</h3>
                <p>{selectedInterview.location}</p>
                {selectedInterview.meetingLink && (
                  <a 
                    href={selectedInterview.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="meeting-link"
                  >
                    Join Meeting
                  </a>
                )}
                {selectedInterview.address && (
                  <p className="address">{selectedInterview.address}</p>
                )}
              </div>

              <div className="preparation-info">
                <h3>Preparation Notes</h3>
                <p>{selectedInterview.notes}</p>
                {selectedInterview.requirements && (
                  <div className="requirements">
                    <h4>Requirements:</h4>
                    <ul>
                      {selectedInterview.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedInterview.feedback && (
                <div className="feedback">
                  <h3>Feedback</h3>
                  <p>{selectedInterview.feedback}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="close-btn" onClick={handleCloseDetails}>
                Close
              </button>
              {selectedInterview.status === 'upcoming' && (
                <>
                  <button 
                    className="reschedule-btn"
                    onClick={() => handleReschedule(selectedInterview.id)}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancel(selectedInterview.id)}
                  >
                    Cancel Interview
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewsSection; 