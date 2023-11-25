import { v4 as uuid } from 'uuid'
export const apiKeyGen = async (req, res, next) => {
    try {
        const key = await uuid().replaceAll('-', '')
        req.apiKeyGen = key;
    } catch (error) {
        console.log(error)
    }
    next();
}