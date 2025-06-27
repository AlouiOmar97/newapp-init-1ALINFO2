const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joueur = new Schema({
    pseudo: String,
    sante: Number,
    score: Number
})
module.exports= mongoose.model('joueurs',Joueur)