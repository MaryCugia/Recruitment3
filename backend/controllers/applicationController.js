import { pool } from '../config/db.js';

// Submit a job application
export const submitApplication = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const userId = req.user.id; // Get the candidate's ID from the authenticated user

    // Check if job exists and is active
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE id = ? AND status = ?',
      [jobId, 'active']
    );

    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found or not active' });
    }

    // Check if already applied
    const [existingApplications] = await pool.query(
      'SELECT * FROM applications WHERE user_id = ? AND job_id = ?',
      [userId, jobId]
    );

    if (existingApplications.length > 0) {
      return res.status(400).json({ error: 'Already applied for this job' });
    }

    // Create application
    const [result] = await pool.query(
      'INSERT INTO applications (user_id, job_id, cover_letter, status) VALUES (?, ?, ?, ?)',
      [userId, jobId, coverLetter, 'pending']
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Server error while submitting application' });
  }
};

// Get all applications for a candidate
export const getCandidateApplications = async (req, res) => {
  try {
    const [applications] = await pool.query(
      `SELECT a.*, j.title, j.company_name, j.location 
       FROM applications a 
       JOIN jobs j ON a.job_id = j.id 
       WHERE a.user_id = ?`,
      [req.user.id]
    );
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
};

// Get all applications for a job (for recruiters)
export const getJobApplications = async (req, res) => {
  try {
    const [applications] = await pool.query(
      `SELECT a.*, u.name as candidate_name, u.email as candidate_email 
       FROM applications a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.job_id = ?`,
      [req.params.jobId]
    );
    res.json(applications);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
};

// Update application status (for recruiters)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await pool.query(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Server error while updating application status' });
  }
}; 