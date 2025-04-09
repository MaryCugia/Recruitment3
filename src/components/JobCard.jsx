import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <div className="job-details">
        <span>{job.location}</span>
        <span>{job.type}</span>
        <span>{job.salary}</span>
      </div>
      <p className="description">{job.description}</p>
      <div className="requirements">
        <h4>Requirements:</h4>
        <ul>
          {job.requirements.slice(0, 3).map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      <Link to={`/job/${job.id}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default JobCard; 