import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { signUp } from '../controllers/userController.js';

dotenv.config();

const router = express.Router();
router.use(bodyParser.json())


/**
 * all appointments routes
 */
 router.options('/', (req, res, next) => {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
    });
    //response
    res.sendStatus(200);
  });


router.post('/register', async(req, res) => {
  await signUp(req, res);
});

export default router