import express from 'express';
import { handleURL, handleRedirect } from '../controllers/urlController.js';

const router = express.Router();

router.post('/', handleURL);
router.get('/:shortId', handleRedirect)

// Default export
export default router;
