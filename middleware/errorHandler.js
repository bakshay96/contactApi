const { constants } = require("../contstants");

const errorHandler=(error,req,res,next)=>{
   console.log(" errorHandler middleware")
   const statusCode=res.statusCode?res.statusCode:500;
   switch (statusCode) {
    case constants.UNUTHORIZED:
        res.status(statusCode).send({title:"Unuthorized",message:error.message,stackTrace:error.stack})
        break;
    case constants.VALIDATION_ERROR:
        res.status(statusCode).send({title:"VALIDATION Failed",message:error.message,stackTrace:error.stack})
        break;
    case constants.NOT_FOUND:
        res.status(statusCode).send({title:"NOT_FOUND",message:error.message,stackTrace:error.stack})
        break;
    case constants.FORBIDDEN:
        res.status(statusCode).send({title:"Forbidden",message:error.message,stackTrace:error.stack})
        break;  
    case constants.SERVER_ERROR:
        res.status(statusCode).send({title:"SERVER_ERROR",message:error.message,stackTrace:error.stack})
        break; 
   
    default:
        console.log("No error, All is Well..!")
        break;
   }
}

module.exports={
    errorHandler
}