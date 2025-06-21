const express = require('express')
const router = express.Router()
const { info } = require('../service/osService')

router.get('/info', info)

module.exports = router