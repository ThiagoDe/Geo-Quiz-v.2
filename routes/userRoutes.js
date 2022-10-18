const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
// const turnsController = require('../controllers/turnsController')


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:id')
    .get(usersController.getUser)

// router.route('/turns')
// // router.route('/:id/turns')
//     .get(turnsController.getAllUserTurns)
//     .post(turnsController.createNewTurn)
//     .patch(turnsController.updateTurn)



module.exports = router 