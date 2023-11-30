import express from "express"
import {loginUser} from "../controllers/loginController.js"

const loginRoute = express.Router()

loginRoute.post('/',loginUser)

export default loginRoute