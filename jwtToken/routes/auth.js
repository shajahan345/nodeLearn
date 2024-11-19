
import express from 'express';
import { registerUser, loginUser, forgotPassword, deleteUser } from '../controllers/authController.js'
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/reset-password', forgotPassword);
router.delete('/delete/:userName', deleteUser);
export default router;