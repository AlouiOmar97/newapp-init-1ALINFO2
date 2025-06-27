const Joueur = require('../model/joueurModel')
const Partie = require('../model/partieModel')
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

async function createPartie(req, res, next){
   await new Partie({
        nom: req.body.nom,
        joueur1: req.params.joueur1,
        joueur2: req.params.joueur2,
        etat: "En cours"
    }).save()
      .then((data, error)=>{
        if(error){
            res.json('error creating partie: '+error)
        }else{
            res.json({
                msg:'Partie created !',
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

const attaque =async (req, res, next)=>{
   let joueur1= await Joueur.findById(req.params.joueur1)
   let joueur2= await Joueur.findById(req.params.joueur2)
   joueur1.score= joueur1.score + 10
   await joueur1.save()
   console.log(joueur1)
   joueur2.sante= joueur2.sante - 20
   await joueur2.save()
   console.log(joueur2)
   res.json({msg:'attaque',
    joueur1: joueur1,
    joueur2
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
    res.render('partie.html.twig')
}

function socketIO(server) {
 
    const io = socketIo(server);
       io.on("connection",async (socket)=>{
           console.log("user connected with socket id"+socket.id); 
           socket.broadcast.emit('msg','A new user is connected!')
           const msgs=await Joueur.find()
           socket.emit('showMsg',msgs)
           socket.on('afficherStat',async (data)=>{
            console.log('Afficher Stat');
            console.log(data);
            
            
            const joueur1= await Joueur.findById(data.joueur1)
            const joueur2= await Joueur.findById(data.joueur2)
            io.emit('msg',JSON.stringify(joueur1))
            io.emit('msg',JSON.stringify(joueur2))
           })
           socket.on('sendMsg',async (data)=>{
            io.emit('msg',data.partie +" : "+ data.joueur1+ " : "+data.joueur2)
            //save msg DB
            await new Partie({
                nom: data.partie,
                joueur1: data.joueur1,
                joueur2: data.joueur2,
                etat: "En cours"
            }).save()
            socket.emit('showMsg',data)
           })
           socket.on('isTyping', (data)=>{
            io.emit('msg', data)
           })
         })
    return io;
   }

module.exports = { create, createPartie, read, readOne, update, deleteC, attaque, showJoueur, socketIO }