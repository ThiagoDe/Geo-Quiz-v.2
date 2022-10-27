const express = require('express')
const router = express.Router()
const roundsController = require('../controllers/roundsController')


router.route('/')
    .get(roundsController.getAllRounds)
    .post(roundsController.createNewRound)
    .patch(roundsController.updateRound)
    .delete(roundsController.deleteRound)


module.exports = router 