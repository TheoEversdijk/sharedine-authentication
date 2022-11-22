import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

import { getUser, getUsers, addNewUser, removeUser, editUser } from "../controllers/userController.js"

/**
 * all appointments routes
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

  
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', addNewUser);

router.put('/:id', editUser)

router.delete('/:id', removeUser);

export default router