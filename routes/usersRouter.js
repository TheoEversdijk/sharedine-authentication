import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { logIn, signUp, getSpecificUser, uploadImage, checkValidated, verify } from '../controllers/userController.js';

dotenv.config();

const router = express.Router();
const jsonParser = bodyParser.json()

router.post('/register', jsonParser, async(req, res) => {
  await signUp(req, res);
});

router.post('/login', jsonParser, async(req, res) => {
  await logIn(req, res);
});

router.get('/', jsonParser, async(req, res) => {
  await getSpecificUser(req, res);
});

router.post('/changeImg', jsonParser, async(req, res) => {
  await uploadImage(req, res);
});

router.post('/checkValidated', jsonParser, async(req, res) => {
  await checkValidated(req, res);
});

router.post('/verify', jsonParser, async(req, res) => {
  await verify(req, res);
});

export default router;