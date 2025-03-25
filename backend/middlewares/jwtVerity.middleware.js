import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies?.token || req.headers['authorization'].split(' ')[1];
    console.log("token ", token)
    if(!token){
        throw new ApiError(
            401,
            "Unauthorized"
        )
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log("decoded Token ", decodedToken)
        req.userId = decodedToken.userId;
        next();
    }catch(error){
        res.status(401).json({message:error.message})
    }
}