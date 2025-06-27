const Joueur = require('../model/joueurModel')
const socketIo = require('socket.io')
async function create(req, res, next){
   await new Joueur({
        pseudo: req.body.pseudo,
        sante: 100,
        score: 0
    }).save()
      .then((data, error)=>{
        if(error){
            res.json('error creating joueur: '+error)
        }else{
            res.json({
                msg:'Joueur created !',
                joueur: data
            })
        }
      })
}

const read =async (req, res, next)=>{
    await Joueur.find()
        .then((data, error)=>{
        if(error){
            res.json('error creating joueur: '+error)
        }else{
            res.json(data)
        }
      })
}

const readOne =async (req, res, next)=>{
    await Joueur.findById(req.params.id)
        .then((data, error)=>{
        if(error){
            res.json('error creating joueur: '+error)
        }else{
            res.json(data)
        }
      })
}

const update =async (req, res, next)=>{
    await Joueur.findByIdAndUpdate(req.params.id, req.body)
        .then((data, error)=>{
        if(error){
            res.json('error creating joueur: '+error)
        }else{
            res.json({
                msg:'updating joueur with id : '+ req.params.id,
                joueur: data
            })
        }
      })
}

const deleteC =async (req, res, next)=>{
    await Joueur.findByIdAndDelete(req.params.id)
        .then((data, error)=>{
        if(error){
            res.json('error creating joueur: '+error)
        }else{
            res.json({
                msg:'deleting joueur with id : '+ req.params.id,
                joueur: data
            })
        }
      })
}

const showJoueur= (req, res, next)=>{
    res.render('joueur.html.twig')
}

function socketIO(server) {
 
    const io = socketIo(server);
       io.on("connection",async (socket)=>{
           console.log("user connected with socket id"+socket.id); 
           socket.broadcast.emit('msg','A new user is connected!')
           const msgs=await Joueur.find()
           socket.emit('showMsg',msgs)

           socket.on('sendMsg',async (data)=>{
            io.emit('msg',data.username +" : "+ data.msg)
            //save msg DB
            await new Joueur({
                pseudo: data.msg,
                sante: req.body.sante
            }).save()
           })
           socket.on('isTyping', (data)=>{
            io.emit('msg', data)
           })
         })
    return io;
   }

module.exports = { create, read, readOne, update, deleteC, showJoueur, socketIO }