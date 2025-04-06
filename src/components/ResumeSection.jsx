import React, { useState } from 'react';
import ResumeViewer from './ResumeViewer';
import '../styles/ResumeSection.css';

const ResumeSection = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'Software Engineer Resume',
      uploadDate: '2024-03-15',
      isDefault: true,
      fileSize: '2.5 MB',
      fileType: 'PDF',
      url: 'https://example.com/resumes/software-engineer.pdf' // This will be replaced with actual file URL
    },
    {
      id: 2,
      name: 'Updated Resume 2024',
      uploadDate: '2024-03-10',
      isDefault: false,
      fileSize: '1.8 MB',
      fileType: 'PDF',
      url: 'https://example.com/resumes/updated-2024.pdf' // This will be replaced with actual file URL
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });
  const [selectedResume, setSelectedResume] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: '', message: '' });

    // Simulate file upload
    setTimeout(() => {
      const newResume = {
        id: resumes.length + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        isDefault: false,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: file.type.split('/')[1].toUpperCase(),
        url: URL.createObjectURL(file) // Create a temporary URL for the uploaded file
      };

      setResumes([...resumes, newResume]);
      setIsUploading(false);
      setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' });
    }, 1500);
  };

  const setDefaultResume = (id) => {
    setResumes(resumes.map(resume => ({
      ...resume,
      isDefault: resume.id === id
    })));
  };

  const deleteResume = (id) => {
    if (resumes.find(r => r.id === id)?.isDefault) {
      setUploadStatus({ type: 'error', message: 'Cannot delete default resume' });
      return;
    }
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
  };

  const handleCloseViewer = () => {
    setSelectedResume(null);
  };

  return (
    <div className="resume-section">
      <div className="resume-header">
        <h2>Resume Management</h2>
        <div className="upload-container">
          <label className="upload-btn">
            Upload New Resume
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
          </label>
          {isUploading && <span className="uploading-text">Uploading...</span>}
        </div>
      </div>

      {uploadStatus.message && (
        <div className={`status-message ${uploadStatus.type}`}>
          {uploadStatus.message}
        </div>
      )}

      <div className="resumes-list">
        {resumes.map(resume => (
          <div key={resume.id} className="resume-card">
            <div className="resume-info">
              <div className="resume-name">
                <h3>{resume.name}</h3>
                {resume.isDefault && <span className="default-badge">Default</span>}
              </div>
              <div className="resume-details">
                <span className="detail-item">
                  <i className="fas fa-calendar"></i>
                  Uploaded: {resume.uploadDate}
                </span>
                <span className="detail-item">
                  <i className="fas fa-file"></i>
                  {resume.fileType}
                </span>
                <span className="detail-item">
                  <i className="fas fa-weight"></i>
                  {resume.fileSize}
                </span>
              </div>
            </div>
            <div className="resume-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => handleViewResume(resume)}
              >
                View
              </button>
              {!resume.isDefault && (
                <>
                  <button 
                    className="action-btn set-default-btn"
                    onClick={() => setDefaultResume(resume.id)}
                  >
                    Set as Default
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => deleteResume(resume.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-file-upload"></i>
          <p>No resumes uploaded yet</p>
          <p className="subtext">Upload your first resume to get started</p>
        </div>
      )}

      {selectedResume && (
        <ResumeViewer
          resume={selectedResume}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default ResumeSection; 