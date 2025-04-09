import React from 'react';
import '../styles/BiasAnalysis.css';
import biasAnalysisData from '../mockData/biasAnalysisData';

const BiasAnalysis = ({ jobId }) => {
  // Use the mock data for the specified jobId, or default to job1
  const biasData = biasAnalysisData[jobId] || biasAnalysisData['job1'];
  
  const renderFairnessScoreClass = (score) => {
    if (score >= 0.85) return 'excellent';
    if (score >= 0.75) return 'good';
    if (score >= 0.65) return 'fair';
    return 'needs-improvement';
  };

  return (
    <div className="bias-analysis">
      <div className="bias-header">
        <h2>Fairness-Aware AI Analysis</h2>
        <p className="bias-description">
          Our AI system uses fairness-aware machine learning algorithms to detect and mitigate bias 
          in the recruitment process, ensuring fair and equitable candidate evaluation.
        </p>
      </div>

      <div className="fairness-metrics-section">
        <h3>Fairness Metrics</h3>
        <div className="fairness-metrics-grid">
          <div className="fairness-metric-card">
            <h4>Gender Fairness</h4>
            <div className={`fairness-score ${renderFairnessScoreClass(biasData.biasMetrics.gender.score)}`}>
              <span className="score-value">{(biasData.biasMetrics.gender.score * 100).toFixed(0)}%</span>
              <span className="score-label">{biasData.biasMetrics.gender.status}</span>
            </div>
            <div className="improvement">
              <span className="before">Before: {(biasData.biasMetrics.gender.beforeMitigation * 100).toFixed(0)}%</span>
              <span className="change">Improvement: {biasData.biasMetrics.gender.improvement}</span>
            </div>
          </div>

          <div className="fairness-metric-card">
            <h4>Age Fairness</h4>
            <div className={`fairness-score ${renderFairnessScoreClass(biasData.biasMetrics.age.score)}`}>
              <span className="score-value">{(biasData.biasMetrics.age.score * 100).toFixed(0)}%</span>
              <span className="score-label">{biasData.biasMetrics.age.status}</span>
            </div>
            <div className="improvement">
              <span className="before">Before: {(biasData.biasMetrics.age.beforeMitigation * 100).toFixed(0)}%</span>
              <span className="change">Improvement: {biasData.biasMetrics.age.improvement}</span>
            </div>
          </div>

          <div className="fairness-metric-card">
            <h4>Ethnic Fairness</h4>
            <div className={`fairness-score ${renderFairnessScoreClass(biasData.biasMetrics.ethnicity.score)}`}>
              <span className="score-value">{(biasData.biasMetrics.ethnicity.score * 100).toFixed(0)}%</span>
              <span className="score-label">{biasData.biasMetrics.ethnicity.status}</span>
            </div>
            <div className="improvement">
              <span className="before">Before: {(biasData.biasMetrics.ethnicity.beforeMitigation * 100).toFixed(0)}%</span>
              <span className="change">Improvement: {biasData.biasMetrics.ethnicity.improvement}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bias-mitigation-section">
        <h3>Bias Mitigation Techniques</h3>
        <div className="algorithm-adjustments">
          <h4>Algorithm Adjustments</h4>
          <ul className="adjustment-list">
            {biasData.algorithmAdjustments.map((adjustment, index) => (
              <li key={index} className="adjustment-item">
                <span className="adjustment-bullet">•</span>
                {adjustment}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="selection-rate-section">
        <h3>Selection Rate Comparison</h3>
        <div className="selection-rate-container">
          <div className="selection-rate-column">
            <h4>Before Bias Mitigation</h4>
            <div className="selection-rate-chart">
              {Object.entries(biasData.fairnessImprovements.selectionRate.beforeMitigation).map(([key, value], index) => {
                if (key !== 'difference') {
                  const numericValue = parseInt(value);
                  return (
                    <div key={index} className="chart-row">
                      <span className="chart-label">{key}</span>
                      <div className="chart-bar-container">
                        <div 
                          className="chart-bar before-bar" 
                          style={{ width: `${numericValue}%` }}
                        ></div>
                        <span className="chart-value">{value}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              <div className="difference-row">
                <span className="difference-label">Difference:</span>
                <span className="difference-value before-difference">
                  {biasData.fairnessImprovements.selectionRate.beforeMitigation.difference}
                </span>
              </div>
            </div>
          </div>

          <div className="selection-rate-column">
            <h4>After Bias Mitigation</h4>
            <div className="selection-rate-chart">
              {Object.entries(biasData.fairnessImprovements.selectionRate.afterMitigation).map(([key, value], index) => {
                if (key !== 'difference') {
                  const numericValue = parseInt(value);
                  return (
                    <div key={index} className="chart-row">
                      <span className="chart-label">{key}</span>
                      <div className="chart-bar-container">
                        <div 
                          className="chart-bar after-bar" 
                          style={{ width: `${numericValue}%` }}
                        ></div>
                        <span className="chart-value">{value}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              <div className="difference-row">
                <span className="difference-label">Difference:</span>
                <span className="difference-value after-difference">
                  {biasData.fairnessImprovements.selectionRate.afterMitigation.difference}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fairness-details-section">
        <h3>Fairness Implementation Details</h3>
        <div className="details-grid">
          <div className="details-card">
            <h4>Data Rebalancing</h4>
            <p>{biasData.fairnessImprovements.datasetRebalance}</p>
          </div>
          <div className="details-card">
            <h4>Protected Features Removed</h4>
            <div className="features-list">
              {biasData.fairnessImprovements.featuresRemoved.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          </div>
          <div className="details-card">
            <h4>Fairness-Aware Model</h4>
            <p>{biasData.fairnessImprovements.modelAdapted}</p>
          </div>
        </div>
      </div>

      <div className="fairness-conclusion">
        <h3>Conclusion</h3>
        <p>
          Our fairness-aware machine learning algorithms have successfully reduced bias in the recruitment process
          by ensuring equal opportunity for all candidates regardless of their demographic characteristics.
          Selection rate disparities have been significantly reduced, and the overall fairness metrics show
          substantial improvement across all protected attributes.
        </p>
      </div>
    </div>
  );
};

export default BiasAnalysis; 