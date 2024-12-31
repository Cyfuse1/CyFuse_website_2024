import express from 'express';
import { GetData } from '../controllers/GetData.controllers.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/getData' , upload.single('file'), GetData);


//http://localhost:3000/api/getData

export default router
