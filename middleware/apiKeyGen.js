import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
export const apiKeyGen = async (req, res, next) => {
    const prisma = new PrismaClient() 
    try {
        const key = await uuid().replaceAll('-', '')

        await prisma.api.create({
            data: {
                apiKey: key
            }
        })
            .then((data) => {
                return res.send({ "API-KEY": data.apiKey }).status(201)
            })
            .catch((err) => {
                return res.status(500).send("Internal Server Error");
            })

    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
    next();
}