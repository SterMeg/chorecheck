const mongoose = require('mongoose')
const Schema = mongoose.Schema

const choreSchema = new Schema({
    chore: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const listSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    },
    chores: [choreSchema]
})

module.exports = {
    List: mongoose.model('List', listSchema),
    Chore: mongoose.model('Chore', choreSchema)
}