import express from 'express';
import {
  uploadToOss,
  uploadMiddleware,
} from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', uploadMiddleware, uploadToOss);

export default router;
