import React, { useState, useEffect } from 'react';
import '../styles/AIInsights.css';
import insightsData from '../mockData/insightsData';
import BiasAnalysis from './BiasAnalysis';

const AIInsights = ({ jobId }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('match');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Use the mock data based on jobId, or fallback to a default one
      const mockResponse = jobId && insightsData[jobId] 
        ? insightsData[jobId] 
        : insightsData['job1']; // Default to job1 if jobId isn't found
      
      setInsights(mockResponse);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [jobId]);

  if (loading) return <div className="loading">Loading insights...</div>;
  if (!insights) return <div className="no-insights">No insights available</div>;

  return (
    <div className="ai-insights-container">
      <div className="ai-insights-tabs">
        <button 
          className={`tab-button ${activeTab === 'match' ? 'active' : ''}`}
          onClick={() => setActiveTab('match')}
        >
          Match Analysis
        </button>
        <button 
          className={`tab-button ${activeTab === 'fairness' ? 'active' : ''}`}
          onClick={() => setActiveTab('fairness')}
        >
          Fairness Analysis
        </button>
      </div>

      {activeTab === 'match' ? (
        <div className="ai-insights">
          <h2>AI Match Insights for {insights.jobTitle}</h2>
          <div className="company-info">
            <span>{insights.company}</span>
          </div>
          
          <div className="match-score">
            <div className="score-circle" style={{ '--score': insights.jobMatchScore }}>
              <span>{insights.jobMatchScore}%</span>
              <div className="score-label">Match Score</div>
            </div>
          </div>

          <div className="insights-section">
            <h3>Skill Match Analysis</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Required Skills</h4>
                <ul>
                  {insights.skillMatch.required.map((skill, index) => (
                    <li key={index} className="skill-item">
                      {insights.skillMatch.matched.includes(skill) ? (
                        <span className="matched">✓ {skill}</span>
                      ) : (
                        <span className="missing">✗ {skill}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="insights-section">
            <h3>Experience Analysis</h3>
            <div className="experience-details">
              <div className="experience-item">
                <span className="label">Required:</span>
                <span className="value">{insights.experienceMatch.required}</span>
              </div>
              <div className="experience-item">
                <span className="label">Your Experience:</span>
                <span className="value">{insights.experienceMatch.candidate}</span>
              </div>
              <div className="experience-item">
                <span className="label">Match Status:</span>
                <span className={`status ${insights.experienceMatch.match.toLowerCase()}`}>
                  {insights.experienceMatch.match}
                </span>
              </div>
            </div>
          </div>
          
          <div className="insights-section">
            <h3>Education Analysis</h3>
            <div className="education-details">
              <div className="education-item">
                <span className="label">Required:</span>
                <span className="value">{insights.educationMatch.required}</span>
              </div>
              <div className="education-item">
                <span className="label">Your Education:</span>
                <span className="value">{insights.educationMatch.candidate}</span>
              </div>
              <div className="education-item">
                <span className="label">Match Status:</span>
                <span className={`status ${insights.educationMatch.match.toLowerCase()}`}>
                  {insights.educationMatch.match}
                </span>
              </div>
            </div>
          </div>

          <div className="insights-section">
            <h3>Cultural Fit Analysis</h3>
            <div className="cultural-fit">
              <div className="fit-score">
                <span className="score">{insights.culturalFit.score}%</span>
                <span className="label">Cultural Fit Score</span>
              </div>
              <ul className="fit-factors">
                {insights.culturalFit.factors.map((factor, index) => (
                  <li key={index} className="factor-item">
                    <span className="check">✓</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="insights-section">
            <h3>Recommendations</h3>
            <ul className="recommendations-list">
              {insights.recommendations.map((rec, index) => (
                <li key={index} className="recommendation-item">
                  <span className="bullet">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <BiasAnalysis jobId={jobId} />
      )}
    </div>
  );
};

export default AIInsights;