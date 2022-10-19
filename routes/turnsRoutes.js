const express = require('express')
const router = express.Router()
const turnsController = require('../controllers/turnsController')


router.route('/')
    .get(turnsController.getAllTurns)
    .post(turnsController.createNewTurn)
    .patch(turnsController.updateTurn)



module.exports = router 