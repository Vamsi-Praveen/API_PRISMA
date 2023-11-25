import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const apiAuth = async (req, res, next) => {
    try {
        const apiKey = req.query.key;
        if(!apiKey)
        {
            return res.status(400).send({"message":"API Key required"})
        }
        const userData = await prisma.user.findUnique(
            {
                where: { apiKey: apiKey }
            }
        )
        if (!userData) {
            req.userExists=false
            return res.status(401).send({ "message": "Invalid/Wrong API key." })
        }
        req.userExists=true;

    } catch (error) {
        console.log(error)
    }
    next();
}