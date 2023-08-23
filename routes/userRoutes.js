const express=require("express");
const { registerUser, loginUser, currentUser } = require("../controller/userController");
const { validateToken } = require("../middleware/validateTokenHandler");
const userRoutes=express.Router();

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);
userRoutes.post("/current",validateToken,currentUser)

module.exports={
    userRoutes
}