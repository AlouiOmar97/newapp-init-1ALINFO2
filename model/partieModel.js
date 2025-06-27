const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Partie = new Schema({
    nom: String,
    joueur1: String,
    joueur2: String,
    etat: String
})
module.exports= mongoose.model('parties',Partie)