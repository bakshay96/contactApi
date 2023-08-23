const express = require("express");
const {
  getAllContact,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controller/contactController");
const contactRoutes = express.Router();

//routes
//get all contacts
contactRoutes.get("/", getAllContact);

// get contact by id
contactRoutes.get("/:id",getContact);

//create contact use post requrest
contactRoutes.post("/", createContact);

//update contact using id param * use put rquest
//put replace old contact 
contactRoutes.put("/:id", updateContact);

//delete contact using id
contactRoutes.delete("/:id", deleteContact);

module.exports = {
  contactRoutes,
};
