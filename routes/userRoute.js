import express from "express";
import { addUser } from "../controllers/userController.js";
import {apiKeyGen} from "../middleware/apiKeyGen.js";
const userRouter = express.Router();

userRouter.post('/addUser',apiKeyGen,addUser);

export default userRouter;