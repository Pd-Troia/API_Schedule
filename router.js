const express = require('express')
const createRoutineController = require('./controller/createRoutine')
const deleteRoutine = require('./controller/deleteRoutine')
const getRoutineController = require('./controller/getRoutineController')
const updateRoutine = require('./controller/UpdateRoutine')

const router = express.Router()

//default route
router.get('/', (req,res)=>res.status(200).json({msg:"api working"}))

//create day schedule
router.post('/routine', createRoutineController)

//get day schedule 
router.get('/routine/:idUser', getRoutineController)

//remove day schedule
router.delete('/routine/:idRoutine', deleteRoutine)

//Update Routine
router.put('/routine/:idRoutine',updateRoutine)

module.exports = router