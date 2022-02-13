const mongoose = require('mongoose')

const bookShelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    private: {
        type: Boolean,
        required: true
    },
    volumes : [ mongoose.Schema.Types.ObjectId ]
})

const BookShelf = mongoose.model('BookShelf', bookShelfSchema)

module.exports = BookShelf