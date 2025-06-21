const express = require('express')
const router = express.Router()
const chatService = require('../service/chatService')
const { read, update, deleteC } = require('../service/chatService')
const validate = require('../middleware/chatValidation')
router.post('/create', validate , chatService.create)
router.get('/list', read)
router.get('/details/:id', chatService.readOne)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteC)
router.get('/show', chatService.showChat)

module.exports = router