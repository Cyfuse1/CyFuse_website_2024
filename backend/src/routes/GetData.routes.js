import express from 'express';
import { GetData } from '../controllers/GetData.controllers.js';

const router = new express.Router();

router.route('/getData').get(GetData);

//http://localhost:3000/api/getData

export default router;
