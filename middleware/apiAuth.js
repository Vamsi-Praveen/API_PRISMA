import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const apiAuth = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if(!apiKey)
        {
            return res.status(400).send({"message":"API Key required"})
        }
        const apiData = await prisma.api.findFirst(
            {
                where:{
                    apiKey:apiKey
                }
            }
        )
        if (!apiData) {
            req.apiExists=false
            return res.status(401).send({ "message": "Invalid/Wrong API key." })
        }
        req.apiExists=true;

    } catch (error) {
        console.log(error)
    }
    next();
}