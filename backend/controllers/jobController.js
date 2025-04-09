import { pool } from '../config/db.js';

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const { title, description, requirements, location, salary } = req.body;
    const posted_by = req.user.id; // Get the recruiter's ID from the authenticated user

    const [result] = await pool.query(
      `INSERT INTO jobs 
       (title, description, requirements, location, salary, posted_by, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, requirements, location, salary, posted_by, 'active']
    );

    res.status(201).json({
      message: 'Job posted successfully',
      jobId: result.insertId
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ error: 'Server error while posting job' });
  }
};

// Get all active jobs
export const getActiveJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query(
      `SELECT j.*, u.name as recruiter_name 
       FROM jobs j 
       JOIN users u ON j.posted_by = u.id 
       WHERE j.status = 'active'`
    );
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error while fetching jobs' });
  }
};

// Get job details
export const getJobDetails = async (req, res) => {
  try {
    const [jobs] = await pool.query(
      `SELECT j.*, u.name as recruiter_name 
       FROM jobs j 
       JOIN users u ON j.posted_by = u.id 
       WHERE j.id = ?`,
      [req.params.id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(jobs[0]);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Server error while fetching job details' });
  }
};

// Get jobs posted by a specific recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE posted_by = ?',
      [req.user.id]
    );
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ error: 'Server error while fetching jobs' });
  }
};

// Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await pool.query(
      'UPDATE jobs SET status = ? WHERE id = ? AND posted_by = ?',
      [status, req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job status updated successfully' });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ error: 'Server error while updating job status' });
  }
}; 