import React, { useState } from 'react';
import { scheduleInterview } from '../api/interviews';
import '../styles/ScheduleInterviewModal.css';

const ScheduleInterviewModal = ({ candidate, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    type: 'Technical',
    date: '',
    time: '',
    duration: '60',
    interviewer: '',
    location: 'Virtual',
    notes: '',
    preparation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const interviewData = {
        candidateId: candidate.id,
        candidateName: candidate.name,
        ...formData
      };

      const newInterview = await scheduleInterview(interviewData);
      onSchedule(newInterview);
      onClose();
    } catch (err) {
      setError('Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Schedule Interview</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="candidate-info">
            <h3>{candidate.name}</h3>
            <p>{candidate.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Interview Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="System Design">System Design</option>
                <option value="Coding">Coding</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration (minutes)</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Virtual">Virtual</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Interviewer</label>
              <input
                type="text"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Preparation Requirements</label>
              <textarea
                name="preparation"
                value={formData.preparation}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="schedule-btn" disabled={loading}>
                {loading ? 'Scheduling...' : 'Schedule Interview'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal; 