import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Admin routes
router.post('/', verifyToken, requireAdmin, createTestimonial);
router.put('/:id', verifyToken, requireAdmin, updateTestimonial);
router.delete('/:id', verifyToken, requireAdmin, deleteTestimonial);

export default router;
