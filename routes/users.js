import bodyParser from 'body-parser';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const jsonParser = bodyParser.json()
const router = express.Router()

// const {
//     getUsers,
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser
// } = require('../controllers/userController.js')

import { getUsers } from "../controllers/userController.js"


router.get('/', getUsers);

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


// const DBUser = process.env.DB_USER || "";
// const DBPassword = process.env.DB_PASSWORD || "";
// const url = `mongodb+srv://${DBUser}:${DBPassword}@tjourney.sbi37ec.mongodb.net/?retryWrites=true&w=majority`;

// EXAMPLEROUTER.get("/", async (req, res, next) => {
//     const client = await MongoClient.connect(url, { useNewUrlParser: true })
//         .catch(err => { console.log(err); });

//     if (!client) {
//         return;
//     }

//     try {
//         const data = await client.db("<DB>").collection("<COLLECTION>").find()
//         const dataArray = await data.toArray()
//         client.close();

//         res.status(200).send(dataArray)
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })

export default router