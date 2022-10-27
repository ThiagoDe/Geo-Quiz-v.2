const Round = require('../models/Round')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')


// @access Private
const getAllRounds = asyncHandler(async (req, res) => {
    // Get all rounds from MongoDB
    const rounds = await Round.find().lean()

    // If no rounds 
    if (!rounds?.length) {
        return res.status(400).json({ message: 'No rounds found' })
    }

//     // Add username to each round before sending the response 
//     // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
//     // You could also do this with a for...of loop
    const roundsWithUser = await Promise.all(rounds.map(async (round) => {
        
        const user = await User.findById(round.user).lean().exec()
        return { ...round, username: user.username }
    }))

    res.json(roundsWithUser)
})


// @desc Create new round
// @route POST /rounds
// @access Private
const createNewRound = asyncHandler(async (req, res) => {
    const { user,time, score, missed, statesScored, statesMissed } = req.body
    // const user = await User.findById(req.params.id).exec()

    // Confirm data
    if (!user || !time || !score || !missed || !statesScored || !statesMissed ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    // const duplicate = await Round.findOne({ title }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate round title' })
    // }

    // Create and store the new user 
    const round = await Round.create({ user, time, score, missed, statesScored, statesMissed })

    if (round) { // Created 
        return res.status(201).json({ message: 'New round created' })
    } else {
        return res.status(400).json({ message: 'Invalid round data received' })
    }

})


// @access Private
const updateRound = asyncHandler(async (req, res) => {
    const { id, user, time, score, missed, statesScored, statesMissed  } = req.body

    // Confirm data
    if (!id || !user || !time || !score || !missed || !statesScored || !statesMissed  ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm round exists to update
    const round = await Round.findById(id).exec()

    if (!round) {
        return res.status(400).json({ message: 'Round not found' })
    }


    round.user = user
    round.time = time
    round.score = score
    round.missed = missed
    round.statesScored = statesScored
    round.statesMissed = statesMissed

    const updatedRound = await round.save()

    res.json(`'${updatedRound.user}' round updated`)
})

// / @desc Delete a round
// @route DELETE /rounds
// @access Private
const deleteRound = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Round ID required' })
    }

    // Confirm round exists to delete 
    const round = await Round.findById(id).exec()

    if (!round) {
        return res.status(400).json({ message: 'Round not found' })
    }

    const result = await round.deleteOne()

    const reply = `Round '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})



module.exports = {
    getAllRounds,
    createNewRound,
    updateRound,
    deleteRound
}