import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// import { getNotify } from "../controllers/notifyController.js"

/**
 * all notification routes
 */
 router.options('/', (req, res, next) => {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  });

  
router.get('/');


export default router