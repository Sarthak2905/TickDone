import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/:id', getBlogPostById);

// Admin routes
router.post('/', verifyToken, requireAdmin, createBlogPost);
router.put('/:id', verifyToken, requireAdmin, updateBlogPost);
router.delete('/:id', verifyToken, requireAdmin, deleteBlogPost);

export default router;
