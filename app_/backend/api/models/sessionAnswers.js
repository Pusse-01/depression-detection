const mongoose = require('mongoose')
const sessionAnswersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Users'
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Sessions'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    videos: {
        type: Array,
        default: ''
    }
})


module.exports = mongoose.model('SessionAnswers', sessionAnswersSchema)