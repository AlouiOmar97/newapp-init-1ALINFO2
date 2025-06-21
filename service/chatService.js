const Chat = require('../model/chatModel')
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

module.exports = { create, read, readOne, update, deleteC }