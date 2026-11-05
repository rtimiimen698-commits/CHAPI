const express = require('express')
const { AddContact, GetAllContacts, DeleteContact, UpdateContact, GetOneContact } = require('../Controllers/Contact')

const contactRouter = express.Router()

contactRouter.post('/addContact', AddContact)

contactRouter.get('/getAllContact', GetAllContacts )

contactRouter.delete('/deleteContact/:id', DeleteContact)

contactRouter.put('/updateContact/:id', UpdateContact)

contactRouter.get('/getOneContact/:id', GetOneContact )


module.exports = contactRouter

