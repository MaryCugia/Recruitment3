import React, { useState } from 'react';
import { searchCandidates } from '../api/candidates';
import CandidateProfileModal from './CandidateProfileModal';
import '../styles/CandidateSearch.css';

const CandidateSearch = () => {
  const [searchForm, setSearchForm] = useState({
    keywords: '',
    location: '',
    experience: '',
    skills: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchCandidates(searchForm);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to search candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseProfile = () => {
    setSelectedCandidate(null);
  };

  const handleContact = (candidate) => {
    window.location.href = `mailto:${candidate.email}`;
  };

  return (
    <div className="candidate-search">
      <div className="search-form-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Keywords</label>
            <input
              type="text"
              name="keywords"
              value={searchForm.keywords}
              onChange={handleInputChange}
              placeholder="e.g., Java, React, Project Management"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={searchForm.location}
              onChange={handleInputChange}
              placeholder="City, State, or Remote"
            />
          </div>
          <div className="form-group">
            <label>Experience Level</label>
            <select
              name="experience"
              value={searchForm.experience}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={searchForm.skills}
              onChange={handleInputChange}
              placeholder="Comma-separated skills"
            />
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Candidates'}
          </button>
        </form>
      </div>

      <div className="search-results">
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Searching candidates...</div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map(candidate => (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-header">
                  <h3>{candidate.name}</h3>
                  <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                    {candidate.status}
                  </span>
                </div>
                <div className="candidate-info">
                  <p className="title">{candidate.title}</p>
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i> {candidate.location}
                  </p>
                  <p className="experience">
                    <i className="fas fa-briefcase"></i> {candidate.experience} years of experience
                  </p>
                </div>
                <div className="skills">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="candidate-actions">
                  <button 
                    className="view-btn"
                    onClick={() => handleViewProfile(candidate)}
                  >
                    View Profile
                  </button>
                  <button 
                    className="contact-btn"
                    onClick={() => handleContact(candidate)}
                  >
                    Contact
                  </button>
                </div>
                <div className="last-updated">
                  Last updated: {new Date(candidate.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="no-results">No candidates found matching your criteria</div>
        )}
      </div>

      {selectedCandidate && (
        <CandidateProfileModal
          candidateId={selectedCandidate.id}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
};

export default CandidateSearch; 