import express from "express";
import { addUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post('/addUser',addUser);

export default userRouter;