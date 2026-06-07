import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Public route
router.post('/', createAppointment);

// Admin routes
router.get('/', verifyToken, requireAdmin, getAllAppointments);
router.get('/:id', verifyToken, requireAdmin, getAppointmentById);
router.put('/:id', verifyToken, requireAdmin, updateAppointment);
router.delete('/:id', verifyToken, requireAdmin, deleteAppointment);

export default router;
