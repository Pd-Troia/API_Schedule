const express = require('express')
const routineController = require('./controllers/RoutineController')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine', routineController.createRoutine)

//get day schedule 
router.get('/routine/:idUser', routineController.getRoutine)

//remove day schedule
router.delete('/routine/:idRoutine', routineController.deleteRoutine)

//Update Routine
router.put('/routine/:idRoutine', routineController.updateRoutine)

//get coincident routime times
router.get('/coincident/:idsRoutine', routineController.getCoincidingTimes)

module.exports = router