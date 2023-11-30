import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllBooks = async (req, res) => {
    try {
        if (req.apiExists) {
            const books = await prisma.booksData.findMany();
            return res.status(200).json({ message: "Books fetched Succesfully", data: books });
        }
    } catch (error) {
        return res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}

export const getBookById = async (req, res) => {
    try {
        const id = req.params.bookId;
        if(id)
        {
            const book = await prisma.booksData.findUnique(
                {
                    where:{
                        id:id
                    }
                }
            );
            return res.status(200).json({"Book Data":book})
        }
    } catch (error) {
        return res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}

export const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        if (req.apiExists) {
            const book = await prisma.booksData.create({
                data: {
                    title: title, author: author
                }
            })
                .then((data) => {
                    res.status(201).send({ "message": "Book Added Succesfull" })
                })
                .catch((err) => {
                    res.status(300).send({ "message": "Failed to Add Book", "error": err })
                })
        }


    } catch (error) {
        return res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
    finally {
        await prisma.$disconnect()
    }
}