const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const validateToken=asyncHandler(async(req,res,next)=>{

    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT),(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error("User is not authorized");

            }
            req.user=decoded.user;
            next();
        }
        if(!token)
        {
            res.staus(401);
            throw new  Error("USER IS NOT AUTHORIZED or token missing ")
        }
    }
})


module.exports={
    validateToken
}