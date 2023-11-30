import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import bookRoute from "./routes/bookRoute.js"
import { apiKeyGen } from "./middleware/apiKeyGen.js"
import { apiUser } from "./middleware/apiUser.js"
import loginRoute from "./routes/loginRoute.js"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/login',loginRoute)

app.use('/api/user', userRouter)

app.use('/api/books',bookRoute)

app.post('/api/genAPIKEY',apiUser,apiKeyGen);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})