import React, { useState, useEffect } from 'react';
import { getRecruiterProfile, updateRecruiterProfile } from '../api/recruiters';
import '../styles/RecruiterProfile.css';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    department: '',
    bio: '',
    expertise: [],
    linkedin: '',
    yearsOfExperience: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getRecruiterProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error loading profile;', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateRecruiterProfile(profile);
      setSuccess(true);
      setIsEditing(false);
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.name) {
    return (
      <div className="recruiter-profile">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="recruiter-profile">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button 
          className={`edit-btn ${isEditing ? 'editing' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
          disabled={loading}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Profile updated successfully!</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              disabled={!isEditing || loading}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Areas of Expertise</label>
            <div className="expertise-tags">
              {profile.expertise.map((skill, index) => (
                <span key={index} className="expertise-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={profile.yearsOfExperience}
              onChange={handleInputChange}
              disabled={!isEditing || loading}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Social Links</h3>
          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleInputChange}
              disabled={!isEditing || loading}
              required
            />
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button 
              type="submit" 
              className="save-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RecruiterProfile; 