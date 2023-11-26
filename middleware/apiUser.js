import { PrismaClient } from "@prisma/client";
export const apiUser = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(300).send({"Error":"User required"})
        }

        await prisma.user.findUnique({
            where: {
                id:userId
            }
        })
            .then((data) => {
                if (!data) {
                    return res.status(300).send({ "Message": "No User Found on userId" });
                }
            })
    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
    next();
}