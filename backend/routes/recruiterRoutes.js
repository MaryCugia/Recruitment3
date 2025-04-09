import express from 'express';
import {
  getAllRecruiters,
  getRecruiterById,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from '../controllers/recruiterController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { pool } from '../config/db.js';
import Recruiter from '../models/Recruiter.js';

const router = express.Router();

router.route('/')
  .get(authenticateToken, authorizeRole(['admin']), getAllRecruiters)
  .post(authenticateToken, authorizeRole(['admin']), createRecruiter);

router.route('/:id')
  .get(authenticateToken, authorizeRole(['admin']), getRecruiterById)
  .put(authenticateToken, authorizeRole(['admin']), updateRecruiter)
  .delete(authenticateToken, authorizeRole(['admin']), deleteRecruiter);

// Post a new job
router.post('/jobs', authenticateToken, async (req, res) => {
  try {
    const { title, description, requirements, location, salary } = req.body;
    const userId = req.user.id;

    const [result] = await pool.query(
      `INSERT INTO jobs 
       (title, description, requirements, location, salary, posted_by, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, requirements, location, salary, userId, 'active']
    );

    res.status(201).json({
      message: 'Job posted successfully',
      jobId: result.insertId
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ error: 'Server error while posting job' });
  }
});

// Get all posted jobs
router.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE posted_by = ?',
      [req.user.id]
    );
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error while fetching jobs' });
  }
});

// Get job applications
router.get('/jobs/:id/applications', authenticateToken, async (req, res) => {
  try {
    const [applications] = await pool.query(
      `SELECT a.*, u.name, u.email 
       FROM applications a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.job_id = ?`,
      [req.params.id]
    );
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
});

// Update application status
router.put('/applications/:id', authenticateToken, async (req, res) => {
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
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Server error while updating application' });
  }
});

// Get candidate profile
router.get('/candidates/:id', authenticateToken, async (req, res) => {
  try {
    const [candidates] = await pool.query(
      'SELECT id, name, email, resume FROM users WHERE id = ? AND role = ?',
      [req.params.id, 'candidate']
    );

    if (candidates.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(candidates[0]);
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    res.status(500).json({ error: 'Server error while fetching candidate profile' });
  }
});

export default router;
