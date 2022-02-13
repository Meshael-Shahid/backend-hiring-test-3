const mongoose = require('mongoose')

const readingPositionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    volume: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Volume'
    },
    readingPosition: {
        type: Number
    },
    detail: {
        type: String
    }
})

const ReadingPosition = mongoose.model('ReadingPosition', readingPositionSchema)
module.exports = ReadingPosition