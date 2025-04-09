import express from 'express';
import { pool } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Apply for a job
router.post('/apply', authenticateToken, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const userId = req.user.id;

    // Check if already applied
    const [existingApplications] = await pool.query(
      'SELECT * FROM applications WHERE user_id = ? AND job_id = ?',
      [userId, jobId]
    );

    if (existingApplications.length > 0) {
      return res.status(400).json({ error: 'Already applied for this job' });
    }

    // Create application
    await pool.query(
      'INSERT INTO applications (user_id, job_id, cover_letter, status) VALUES (?, ?, ?, ?)',
      [userId, jobId, coverLetter, 'pending']
    );

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ error: 'Server error during application submission' });
  }
});

// Get all jobs
router.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE status = ?',
      ['active']
    );
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error while fetching jobs' });
  }
});

// Get job details
router.get('/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE id = ?',
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
});

// Get user's applications
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const [applications] = await pool.query(
      `SELECT a.*, j.title, j.company_name 
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
});

export default router; 