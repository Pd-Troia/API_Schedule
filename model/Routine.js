const mongoose = require('mongoose')
const schema = mongoose.Schema({
    idUser: Number,
    intervals: [{initial: Number, ending: Number, label: String}]
})
const Routine = mongoose.model("Routine", schema )
module.exports = Routine