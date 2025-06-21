const express = require('express')
const router = express.Router()
const chatService = require('../service/chatService')
const { read, update, deleteC } = require('../service/chatService')
router.post('/create', chatService.create)
router.get('/list', read)
router.get('/details/:id', chatService.readOne)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteC)

module.exports = router