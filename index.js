const express=require("express");
const dotenv=require("dotenv");
const {contactRoutes}=require("./routes/contactRoutes");
const app=express();


const port=process.env.port || 5000;

//router
//middlewares
app.use(express.json())
app.use("/api/contacts",contactRoutes);


//server   
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`)
})