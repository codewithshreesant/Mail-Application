
import express,{ Router } from 'express'
import { verifyToken } from '../middlewares/jwtVerity.middleware.js';
import { getSentEmails, sendEmail } from '../controllers/sentEmail.controller.js';

const router = Router();

router.route('/send').post(verifyToken, sendEmail);
router.route('/sents').get(verifyToken,getSentEmails);
// router.route()

export default router;    