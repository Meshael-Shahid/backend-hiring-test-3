const mongoose = require('mongoose')
 
const volumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    pages: {
        type: Number,
        required: true
    }
})
 
const Volume = mongoose.model('Volume', volumeSchema)
 
module.exports = Volume