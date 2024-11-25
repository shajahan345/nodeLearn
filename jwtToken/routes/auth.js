
import express from 'express';
import { registerUser, loginUser, forgotPassword, deleteUser } from '../controllers/authController.js';
import {authenticateToken} from '../middlewares/authenticateToken.js'
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/reset-password', forgotPassword);
router.delete('/delete/:userName', deleteUser);
router.get('/all', authenticateToken, (req, res) => {
})
export default router;