const Turn = require('../models/Turn')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')


// @access Private
const getAllTurns = asyncHandler(async (req, res) => {
    // Get all turns from MongoDB
    const turns = await Turn.find().lean()

    // If no notes 
    if (!turns?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

//     // Add username to each note before sending the response 
//     // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
//     // You could also do this with a for...of loop
    const turnsWithUser = await Promise.all(turns.map(async (turn) => {
        
        const user = await User.findById(turn.user).lean().exec()
        return { ...turn, username: user.username }
    }))

    res.json(turnsWithUser)
})


// @desc Create new note
// @route POST /notes
// @access Private
const createNewTurn = asyncHandler(async (req, res) => {
    const { user,time, score, missed } = req.body
    // const user = await User.findById(req.params.id).exec()

    // Confirm data
    if (!user || !time || !score || !missed ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    // const duplicate = await Turn.findOne({ title }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    // Create and store the new user 
    const turn = await Turn.create({ user, time, score, missed })

    if (turn) { // Created 
        return res.status(201).json({ message: 'New turn created' })
    } else {
        return res.status(400).json({ message: 'Invalid turn data received' })
    }

})


// @access Private
const updateTurn = asyncHandler(async (req, res) => {
    const { id, user, time, score, missed  } = req.body

    // Confirm data
    if (!id || !user || !time || !score || !missed ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm turn exists to update
    const turn = await Turn.findById(id).exec()

    if (!turn) {
        return res.status(400).json({ message: 'Turn not found' })
    }


    turn.user = user
    turn.time = time
    turn.score = score
    turn.missed = missed

    const updatedTurn = await turn.save()

    res.json(`'${updatedTurn.user}' turn updated`)
})



module.exports = {
    getAllTurns,
    createNewTurn,
    updateTurn,
}