//@desc Get all contacts
//@route GET- /api/contacts

const { ContactModel } = require("../models/contactModel");

//@access public
const getAllContact = async (req, res) => {
  try {
    const AllContacts=await ContactModel.find();
    res.status(200).send({ msg: "All contacts",AllContacts });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};


//@desc get contact
//@route get- /api/contacts/:id
//@access public
const getContact = async (req, res) => {
  const id=req.params.id;
  try {
     const Contact=await ContactModel.find({_id:id});
     if(!Contact.length)
     {
      res.status(404);
      throw new Error("Contact not found")
     }

    res
      .status(200)
      .send({ msg: `Get contact for ${req.params.id} successfully`,Contact });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};


//@desc create  contacts
//@route POST- /api/contacts
//@access public
const createContact = async (req, res) => {
  try {
    const {name,email,phone}=ContactModel(req.body);
    
    if(!name || !email || !phone)
    {
      res.status(400);
      throw new Error("All fields are mandetory..!")
    }
    const payload=ContactModel(req.body);
    const newContact=await payload.save();
    

    res.status(201).send({newContact });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

//update contact
//@desc update contacts
//@route PUT- /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
  try {
    const contact=await ContactModel.findById(req.params.id);
    if(! contact){
      res.status(404);
      throw new Error("Contact not found")
    }
    
    const updatedContact=await ContactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      
    );

    
    res
      .status(200).send({ msg: `updated contact successfully`,updatedContact});
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

//delete contact
//@desc delete contacts
//@route POST /api/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  try {
    const contact=await ContactModel.findByIdAndDelete(req.params.id)
    console.log(contact);
    if(! contact)
    {
      res.status(404);
      throw new Error("Contact not found..!");
    }
    
    res
      .status(200).send({ msg: `delete contact for ${req.params.id} successfully`,contact});
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  getAllContact,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
