const express = require('express')
const createRoutineController = require('./controller/CRUD/createRoutineController')
const deleteRoutineController = require('./controller/CRUD/deleteRoutineController')
const getRoutineController = require('./controller/CRUD/getRoutineController')
const updateRoutineController = require('./controller/CRUD/updateRoutineController')
const getFreeTimeController = require('./controller/Features/free_time/getFreeTimeController')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine', createRoutineController)

//get day schedule 
router.get('/routine/:idUser', getRoutineController)

//remove day schedule
router.delete('/routine/:idRoutine', deleteRoutineController)

//Update Routine
router.put('/routine/:idRoutine',updateRoutineController)

//Get free times 
router.get('/freetime/:idRoutine', getFreeTimeController)

module.exports = router