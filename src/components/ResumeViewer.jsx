import React from 'react';
import '../styles/ResumeViewer.css';

const ResumeViewer = ({ resume, onClose }) => {
  return (
    <div className="resume-viewer-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{resume.name}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {resume.fileType === 'PDF' ? (
            <iframe
              src={resume.url}
              title={resume.name}
              className="pdf-viewer"
            />
          ) : (
            <div className="document-preview">
              <p>Document preview is only available for PDF files.</p>
              <p>Please download the file to view it.</p>
              <a 
                href={resume.url} 
                download={resume.name}
                className="download-btn"
              >
                Download Document
              </a>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="download-btn" onClick={() => window.open(resume.url, '_blank')}>
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer; 