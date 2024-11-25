import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);


export default router;
