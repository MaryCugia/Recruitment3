import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AIInsights from './AIInsights';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // This would be replaced with an actual API call
        const mockJob = {
          id: id,
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          location: 'Remote',
          salary: '$120,000 - $150,000',
          description: 'We are looking for a Senior Software Engineer to join our team...',
          requirements: [
            '5+ years of experience in software development',
            'Strong proficiency in JavaScript and React',
            'Experience with Node.js and Express',
            'Knowledge of database systems and SQL',
            'Excellent problem-solving skills'
          ],
          responsibilities: [
            'Develop and maintain web applications',
            'Collaborate with cross-functional teams',
            'Write clean, maintainable code',
            'Participate in code reviews',
            'Contribute to architectural decisions'
          ],
          benefits: [
            'Competitive salary and equity',
            'Health, dental, and vision insurance',
            '401(k) matching',
            'Flexible work hours',
            'Remote work options'
          ]
        };
        setJob(mockJob);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error fetching job details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading job details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div className="not-found">Job not found</div>;

  return (
    <div className="job-details-container">
      <div className="job-header">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        <div className="job-meta">
          <span className="location">{job.location}</span>
          <span className="salary">{job.salary}</span>
        </div>
      </div>

      <div className="job-content">
        <div className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>

          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>

          <h3>Benefits</h3>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="job-actions">
          <button className="apply-button">Apply Now</button>
          <button className="save-button">Save Job</button>
        </div>
      </div>

      <div className="ai-insights-section">
        <h3>Your Match Analysis</h3>
        <AIInsights jobId={id} />
      </div>
    </div>
  );
};

export default JobDetails; 