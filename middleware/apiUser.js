import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
export const apiUser = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        const { ghJbgyvWnkT } = req.cookies;
        if (!ghJbgyvWnkT) {
            return res.status(300).send({ "Error": "User Login required" })
        }
        const decode = jwt.verify(ghJbgyvWnkT, process.env.JWT_SECRET)
        if (decode) {
            await prisma.user.findUnique({
                where: {
                    id: decode.id
                }
            })
                .then((data) => {
                    if (!data) {
                        return res.status(300).send({ "Message": "No User Found on userId" });
                    }
                })
        }

    } catch (error) {
        console.log(error)
    }
    finally {
        await prisma.$disconnect()
    }
    next();
}