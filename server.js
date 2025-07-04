var express= require('express')
var app = express()
var http = require('http')
const path = require('path')
const osRouter = require('./controller/osController')
const chatRouter = require('./controller/chatController')
const joueurRouter = require('./controller/joueurController')
const mongoose = require('mongoose')
//const { socketIO } = require('./service/chatService')
const { socketIO } = require('./service/joueurService')
const url = require('./database/mongodb.json')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')
app.use(express.json())

app.use('/os', osRouter)
app.use('/chat', chatRouter)
app.use('/joueur', joueurRouter)

server= http.createServer(app)
const io = socketIO(server);
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