const Chat = require('../model/chatModel')
const socketIo = require('socket.io')
async function create(req, res, next){
   await new Chat({
        content: req.body.content,
        dateCreation: new Date()
    }).save()
      .then((data, error)=>{
        if(error){
            res.json('error creating chat: '+error)
        }else{
            res.json({
                msg:'Chat created !',
                chat: data
            })
        }
      })
}

const read =async (req, res, next)=>{
    await Chat.find()
        .then((data, error)=>{
        if(error){
            res.json('error creating chat: '+error)
        }else{
            res.json(data)
        }
      })
}

const readOne =async (req, res, next)=>{
    await Chat.findById(req.params.id)
        .then((data, error)=>{
        if(error){
            res.json('error creating chat: '+error)
        }else{
            res.json(data)
        }
      })
}

const update =async (req, res, next)=>{
    await Chat.findByIdAndUpdate(req.params.id, req.body)
        .then((data, error)=>{
        if(error){
            res.json('error creating chat: '+error)
        }else{
            res.json({
                msg:'updating chat with id : '+ req.params.id,
                chat: data
            })
        }
      })
}

const deleteC =async (req, res, next)=>{
    await Chat.findByIdAndDelete(req.params.id)
        .then((data, error)=>{
        if(error){
            res.json('error creating chat: '+error)
        }else{
            res.json({
                msg:'deleting chat with id : '+ req.params.id,
                chat: data
            })
        }
      })
}

const showChat= (req, res, next)=>{
    res.render('chat.html.twig')
}

function socketIO(server) {
 
    const io = socketIo(server);
       io.on("connection",(socket)=>{
           console.log("user connected with socket id"+socket.id); 
           socket.emit('msg','A new user is connected!')
           socket.on('sendMsg',(data)=>{
            io.emit('msg',data)
           })
         })
    return io;
   }

module.exports = { create, read, readOne, update, deleteC, showChat, socketIO }