const express = require('express')
const createRoutineController = require('./controller/CRUD/createRoutine')
const deleteRoutine = require('./controller/CRUD/deleteRoutine')
const getRoutineController = require('./controller/CRUD/getRoutineController')
const updateRoutine = require('./controller/CRUD/updateRoutine')
const getFreeTimeController = require('./controller/Features/FreeTime/getFreeTimeController')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine', createRoutineController)

//get day schedule 
router.get('/routine/:idUser', getRoutineController)

//remove day schedule
router.delete('/routine/:idRoutine', deleteRoutine)

//Update Routine
router.put('/routine/:idRoutine',updateRoutine)

//Get free times 
router.get('/freetime/:idRoutine', getFreeTimeController)

module.exports = router