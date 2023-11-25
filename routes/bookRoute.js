import express from "express"
import { addBook, getAllBooks, getBookById } from "../controllers/booksController.js"
import { apiAuth } from "../middleware/apiAuth.js"

const bookRoute = express.Router()


bookRoute.get('/getallbooks/', apiAuth, getAllBooks)
bookRoute.get('/getbook/:bookId/', apiAuth, getBookById)
bookRoute.post('/addbook/', apiAuth, addBook)


export default bookRoute
