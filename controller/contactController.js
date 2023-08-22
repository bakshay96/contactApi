const getAllContact=(req,res)=>{
    res.status(200).send({"msg":"All contacts"})
}

//get contact using id
const getContact=(req,res)=>{
    res.status(200).send({"msg": `Get contact for ${req.params.id} successfully`})
}

//create contact
const createContact=(req,res)=>{
    res.status(200).send({"msg": "create new contact successfully"})
}

//update contact
const updateContact=(req,res)=>{
    res.status(200).send({"msg": `update contact for ${req.params.id} successfully`})
}

//delete contact
const deleteContact=(req,res)=>{
    res.status(200).send({"msg": `delete contact for ${req.params.id} successfully`})
}




module.exports=
{
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}