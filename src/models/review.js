const mongoose = require('mongoose')
const validator = require('validator')

const reviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        validate(value) {
            if (value < 1 || value > 5) {
                throw new Error ('Rate between 1 to 5!')
            }
        }
    },
    comment: {
        type: String,
        trim: true
    },
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review