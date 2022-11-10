const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    time: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    missed: {
        type: Number,
        default: 0
    },
    statesScored: [],
    statesMissed: [],
       
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Round', roundSchema)