import express from 'express';
import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'recruiter'), getAllCandidates)
  .post(protect, authorize('admin'), createCandidate);

router.route('/:id')
  .get(protect, authorize('admin', 'recruiter'), getCandidateById)
  .put(protect, authorize('admin'), updateCandidate)
  .delete(protect, authorize('admin'), deleteCandidate);

export default router;
