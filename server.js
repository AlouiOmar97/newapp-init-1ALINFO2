var express= require('express')
var app = express()
var http = require('http')
const path = require('path')
const osRouter = require('./controller/osController')
const chatRouter = require('./controller/chatController')
const mongoose = require('mongoose')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')
app.use(express.json())

app.use('/os', osRouter)
app.use('/chat', chatRouter)

server= http.createServer(app)
const url = require('./database/mongodb.json')
mongoose.connect(url.mongo.uri)
        .then(()=>{
            console.log('DB Connected !')
        })
        .catch((error)=>{
            console.log('DB error : '+ error)
        })
server.listen(3000, ()=>{
    console.log("Server started on 3000!");
})