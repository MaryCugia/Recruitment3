import express from 'express';
import { 
  createJob, 
  getActiveJobs, 
  getJobDetails, 
  getRecruiterJobs, 
  updateJobStatus 
} from '../controllers/jobController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (accessible to all)
router.get('/active', getActiveJobs);
router.get('/:id', getJobDetails);

// Protected routes for recruiters
router.post('/', authenticateToken, authorizeRole(['recruiter']), createJob);
router.get('/recruiter/myjobs', authenticateToken, authorizeRole(['recruiter']), getRecruiterJobs);
router.put('/:id/status', authenticateToken, authorizeRole(['recruiter']), updateJobStatus);

export default router; 