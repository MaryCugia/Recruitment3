import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfileSection.css';

const STORAGE_KEY = 'candidate_profile_data';

const ProfileSection = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: 'Nairobi, Kenya',
      dateOfBirth: '',
      gender: ''
    },
    professional: {
      currentTitle: '',
      yearsOfExperience: '',
      currentCompany: '',
      industry: ''
    },
    education: [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false
    }],
    workExperience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Load saved profile data on component mount
  useEffect(() => {
    if (currentUser) {
      // Try to load user profile from localStorage
      const savedData = localStorage.getItem(`${STORAGE_KEY}_${currentUser.uid}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          console.log('Loaded profile data from localStorage');
        } catch (error) {
          console.error('Error parsing saved profile data:', error);
        }
      }
    }
  }, [currentUser]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addNewItem = (section) => {
    const newItem = section === 'education' ? {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false
    } : {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveStatus({ type: '', message: '' });

    try {
      // Save to localStorage with user ID to keep profiles separate
      if (currentUser) {
        localStorage.setItem(`${STORAGE_KEY}_${currentUser.uid}`, JSON.stringify(formData));
        console.log('Profile saved to localStorage');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSaveStatus({ type: 'success', message: 'Profile saved successfully!' });
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      {saveStatus.message && (
        <div className={`save-status ${saveStatus.type}`}>
          {saveStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.personal.firstName}
                onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.personal.lastName}
                onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.personal.phone}
                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.personal.location}
                onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.personal.dateOfBirth}
                onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={formData.personal.gender}
                onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Title</label>
              <input
                type="text"
                value={formData.professional.currentTitle}
                onChange={(e) => handleInputChange('professional', 'currentTitle', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                value={formData.professional.yearsOfExperience}
                onChange={(e) => handleInputChange('professional', 'yearsOfExperience', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Current Company</label>
              <input
                type="text"
                value={formData.professional.currentCompany}
                onChange={(e) => handleInputChange('professional', 'currentCompany', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input
                type="text"
                value={formData.professional.industry}
                onChange={(e) => handleInputChange('professional', 'industry', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="form-grid">
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleArrayItemChange('education', index, 'fieldOfStudy', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleArrayItemChange('education', index, 'startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => handleArrayItemChange('education', index, 'endDate', e.target.value)}
                    disabled={edu.currentlyStudying}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={edu.currentlyStudying}
                      onChange={(e) => handleArrayItemChange('education', index, 'currentlyStudying', e.target.checked)}
                    />
                    Currently Studying
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addNewItem('education')}>
            Add Education
          </button>
        </div>

        <div className="form-section">
          <h3>Work Experience</h3>
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="work-experience-item">
              <div className="form-grid">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'company', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'position', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'startDate', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'endDate', e.target.value)}
                    disabled={exp.currentlyWorking}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'currentlyWorking', e.target.checked)}
                    />
                    Currently Working
                  </label>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addNewItem('workExperience')}>
            Add Work Experience
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection; 