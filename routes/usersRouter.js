import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { signUp } from '../controllers/userController.js';

dotenv.config();

const router = express.Router();
const jsonParser = bodyParser.json()

router.post('/register', jsonParser, async(req, res) => {
  await signUp(req, res);
});

export default router