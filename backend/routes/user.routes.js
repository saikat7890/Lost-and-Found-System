import express from 'express'
import { getUser, logInUser, logOutUser, registerUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logInUser);
router.get('/get-user', auth, getUser);
router.post('/logout', auth, logOutUser);

export default router;