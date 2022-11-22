const express = require('express')
const router = express.Router()
const roundsController = require('../controllers/roundsController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(roundsController.getAllRounds)
    .post(roundsController.createNewRound)
    .patch(roundsController.updateRound)
    .delete(roundsController.deleteRound)


module.exports = router 