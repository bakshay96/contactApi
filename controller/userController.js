const asyncHandler=require("express-async-handler");
const { UserModel } = require("../models/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
console.log(process.env.ACCESS_TOKEN_SECRET)
require("dotenv").config();


//@desc Register a userRoutes
//@route POST /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=UserModel(req.body)

    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fileds are mandatory.!")
    }
    
    const userAvialable=await UserModel.find({email});
    console.log(userAvialable)
    if(userAvialable.length)
    {
        res.status(400);
        throw new Error("User already registered.!")
    }

    //incrept password
    const hashPassword=await bcrypt.hash(password, 4)
    const newUser=UserModel({username,email,password:hashPassword});
     await newUser.save();
     if(newUser)
     {
        res.status(201).json({id:newUser._id,email:newUser.email})
     }
     else
     {
        res.status(400);
        throw new Error("User data is not valid..!")
     }
     res.status(200).send({"msg":"Register the user..!"})
    console.log("hash password",hashPassword);
        // Store hash in your password DB.
    

    
    


})

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err, result)=> {
                 if(result){
                    res.send({"msg":"Login Successfull !!","token":jwt.sign({"userID":user._id}, "masai")});
                 }else{
                    res.send("Wrong Credentials !!");
                 }
            });
        }else{
            res.send("Please Register First !!");
        }
    }catch(err){
        res.send({"msg":err.message});
    }
    // if(!email || !password)
    // {
    //     res.status(400);
    //     throw new Error("All fileds are mandatory.!")
    // }
    // const user=await UserModel.find({email});
    // console.log(user);
    // // compare password with hash hashPassword
    // if(user && bcrypt.compare(password, user.password))
    // {
    //     const accessToken=jwt.sign({
    //         user:{
    //             username:user.username,
    //             email:user.email
    //         },
    //     },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"})
    //     res.status(200).json({accessToken})
    // }
    // else
    // {
    //     res.status(401);
    //     throw new Error("Invalid Credentials.!")
    // }
   

})

//@desc current a user
//@route POST /api/users/current
//@access public
const currentUser=async(req,res)=>{

    res.status(200).send({"msg":"Current user..!"})

}

module.exports={
    registerUser,
    loginUser,
    currentUser
}