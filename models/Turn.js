const mongoose = require('mongoose')

const turnSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    statesScored: [{
        type: String,
        
    }],
    statesMissed: [{
        type: Number,
        
    }],
       
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Turn', turnSchema)