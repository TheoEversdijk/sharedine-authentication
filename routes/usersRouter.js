import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { logIn, signUp, getUsers, getSpecificUser, uploadImage } from '../controllers/userController.js';

dotenv.config();

const router = express.Router();
const jsonParser = bodyParser.json()

router.post('/register', jsonParser, async(req, res) => {
  await signUp(req, res);
});

router.post('/login', jsonParser, async(req, res) => {
  await logIn(req, res);
})

router.get('/:id', jsonParser, async(req, res) => {
  await getSpecificUser(req, res);
})

router.post('/changeImg', jsonParser, async(req, res) => {
  await uploadImage(req, res);
})

export default router