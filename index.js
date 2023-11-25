import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import bookRoute from "./routes/bookRoute.js"
const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use('/api/user', userRouter)

app.use('/api/books',bookRoute)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})