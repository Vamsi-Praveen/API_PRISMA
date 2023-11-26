import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export const addUser = async (req, res, next) => {
    const { name, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await prisma.user.create({
            data: {
                name: name,
                password: hashedPassword,
            }
        })
            .then((data) => {
                res.status(201).send({ "message": "User Created Succesfull" })
            })
            .catch((err) => {
                res.status(300).send({ "message": "Failed to create user", "error": err })
            })
    } catch (err) {
        console.log(err)
    }
    finally{
        await prisma.$disconnect()
    }
}