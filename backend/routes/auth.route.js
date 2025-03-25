
import express, { Router } from 'express'
import { getCurrentUser, loginUser, logout, registerUser, updateSmtpConfiguration, updateUserImapConfig } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/jwtVerity.middleware.js';
import { getInbox } from '../controllers/incomingEmail.controller.js';
import { createDraft, getDraft } from '../controllers/draft.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout)
router.route('/me').get(getCurrentUser);
router.route('/smtp').put(verifyToken,updateSmtpConfiguration);
router.route('/inbox').get(verifyToken,getInbox);
router.route('/imap').put(verifyToken,updateUserImapConfig);
router.route('/create-draft').post(verifyToken, createDraft);
router.route('/drafts').get(verifyToken, getDraft);

export default router;