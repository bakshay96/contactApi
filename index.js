const express=require("express");
require("dotenv").config();
const {contactRoutes}=require("./routes/contactRoutes");
const { connection } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const { userRoutes } = require("./routes/userRoutes");


const app=express();


const port=process.env.port || 5000;

//router
// *middlewares
app.use(express.json())   //we get response in json format
app.use("/api/contacts",contactRoutes);   //contact router using middleware
app.use("/api/contacts",userRoutes);
app.use(errorHandler);



//server   
app.listen(port,async()=>{
   console.log(`Server is running on port ${port}`)
   try {
      console.log("Please wait .....")
      await connection;
      console.log("db connected successfully")
   } catch (error) {
      console.log(error.message)
      process.exit(1);
   }
})