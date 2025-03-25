import express from 'express';
import { createAdmin, adminLogin } from '../controllers/admin.controller.js'; // Import using ES Modules

const router = express.Router();

router.post('/admin/create', createAdmin);
router.post('/admin/login', adminLogin);

export default router;
