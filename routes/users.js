import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const jsonParser = bodyParser.json();
const router = express.Router();

// const {
//     getUsers,
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser
// } = require('../controllers/userController.js')

import { getUser, getUsers } from "../controllers/userController.js"

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

// router.get('/:userID', cors(), getUser, (req, res, next) => {
//     res.json('USERID');
// })

// router.post('/', createUser,  (req, res, next) => {
//     res.json('Testing');
//   });
  
// router.put('/:userID', updateUser,  (req, res, next) => {
//     res.json('Testing update');
//   });

// router.delete('/:userID', deleteUser,  (req, res, next) => {
//     res.json('Testing delete');
//   });

export default router