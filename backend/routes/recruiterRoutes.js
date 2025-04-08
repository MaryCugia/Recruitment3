import express from 'express';
import {
  getAllRecruiters,
  getRecruiterById,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from '../controllers/recruiterController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getAllRecruiters)
  .post(protect, authorize('admin'), createRecruiter);

router.route('/:id')
  .get(protect, authorize('admin'), getRecruiterById)
  .put(protect, authorize('admin'), updateRecruiter)
  .delete(protect, authorize('admin'), deleteRecruiter);

export default router;
