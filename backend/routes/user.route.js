
import express,{Router} from 'express' 
import { verifyToken } from '../middlewares/jwtVerity.middleware.js';

const router = Router();

router.route('/smtp').post(verifyToken);