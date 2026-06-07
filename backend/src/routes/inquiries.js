import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from '../controllers/inquiryController.js';

const router = express.Router();

// Public route
router.post('/', createInquiry);

// Admin routes
router.get('/', verifyToken, requireAdmin, getAllInquiries);
router.get('/:id', verifyToken, requireAdmin, getInquiryById);
router.put('/:id', verifyToken, requireAdmin, updateInquiry);
router.delete('/:id', verifyToken, requireAdmin, deleteInquiry);

export default router;
