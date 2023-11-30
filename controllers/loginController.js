import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const { name, password } = req.body;
        if (name != '' && password != '') {
            const userExist = await prisma.user.findFirst(
                {
                    where:{
                        name:name
                    }
                }
            )
            if(!userExist)
            {
                return res.status(400).json({"message":"No user found"})
            } 
            const isUserCorrect = await bcrypt.compare(password,userExist.password)
            if(!isUserCorrect)
            {
                return res.status(400).json({"message":"Wrong Password"})
            }
            const token = jwt.sign({id:userExist.id},process.env.JWT_SECRET);
            
            res.cookie('ghJbgyvWnkT',token,{HttpOnly:true}).status(200).json({"token":token})
        }
        if(!name)
        {
            return res.status(300).json({"message":"Credentails Needed"})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}