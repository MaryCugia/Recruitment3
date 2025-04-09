import express from 'express';
import { 
  submitApplication, 
  getCandidateApplications, 
  getJobApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected routes for candidates
router.post('/', authenticateToken, authorize(['candidate']), submitApplication);
router.get('/myapplications', authenticateToken, authorize(['candidate']), getCandidateApplications);

// Protected routes for recruiters
router.get('/job/:jobId', authenticateToken, authorize(['recruiter']), getJobApplications);
router.put('/:id/status', authenticateToken, authorize(['recruiter']), updateApplicationStatus);

export default router; 