import React, { useEffect, useRef, useState } from 'react';
import ScheduleInterviewModal from './ScheduleInterviewModal';
import { getCandidateById } from '../api/candidates';
import '../styles/CandidateProfileModal.css';

const CandidateProfileModal = ({ candidateId, onClose }) => {
  const modalRef = useRef(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateById(candidateId);
        setCandidate(data);
      } catch (err) {
        setError('Failed to load candidate profile');
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchCandidate();
    }
  }, [candidateId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleScheduleInterview = (newInterview) => {
    // You can add any additional logic here, such as updating the interviews list
    console.log('New interview scheduled:', newInterview);
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" ref={modalRef}>
          <div className="loading">Loading candidate profile...</div>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" ref={modalRef}>
          <div className="error-message">{error || 'Candidate not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content" ref={modalRef}>
          <div className="modal-header">
            <h2>Candidate Profile</h2>
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="profile-header">
              <div className="profile-info">
                <h3>{candidate.name}</h3>
                <p className="title">{candidate.title}</p>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i> {candidate.location}
                </p>
              </div>
              <div className="profile-status">
                <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                  {candidate.status}
                </span>
              </div>
            </div>

            <div className="profile-section">
              <h4>Professional Summary</h4>
              <p className="summary">{candidate.summary}</p>
            </div>

            <div className="profile-section">
              <h4>Skills</h4>
              <div className="skills-list">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h4>Education</h4>
              <div className="education-list">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h5>{edu.degree}</h5>
                    <p className="school">{edu.school}</p>
                    <p className="year">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h4>Experience</h4>
              <div className="experience-list">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h5>{exp.title}</h5>
                    <p className="company">{exp.company}</p>
                    <p className="duration">{exp.duration}</p>
                    <p className="description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h4>Contact Information</h4>
              <div className="contact-info">
                <p>
                  <i className="fas fa-envelope"></i>
                  <span>Email: {candidate.email}</span>
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  <span>Phone: {candidate.phone}</span>
                </p>
                <p>
                  <i className="fas fa-link"></i>
                  <span>LinkedIn: {candidate.linkedin}</span>
                </p>
              </div>
            </div>

            <div className="profile-section">
              <h4>Recent Activity</h4>
              <div className="activity-timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Last Updated</div>
                  <div className="timeline-content">
                    Profile updated on {new Date(candidate.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Status</div>
                  <div className="timeline-content">
                    Currently {candidate.status.toLowerCase()} and open to new opportunities
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="contact-btn" 
                onClick={() => window.location.href = `mailto:${candidate.email}`}
              >
                <i className="fas fa-envelope"></i> Send Email
              </button>
              <button 
                className="schedule-btn" 
                onClick={() => setShowScheduleModal(true)}
              >
                <i className="fas fa-calendar-alt"></i> Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <ScheduleInterviewModal
          candidate={candidate}
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleInterview}
        />
      )}
    </>
  );
};

export default CandidateProfileModal; 