const express = require('express')
const router = express.Router()
const joueurService = require('../service/joueurService')
const { read, update, deleteC } = require('../service/joueurService')
const validate = require('../middleware/joueurValidation')
router.post('/create', validate , joueurService.create)
router.get('/list', read)
router.get('/details/:id', joueurService.readOne)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteC)
router.get('/show', joueurService.showJoueur)

module.exports = router