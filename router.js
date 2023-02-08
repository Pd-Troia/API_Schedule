const express = require('express')
const createRoutineController = require('./controller/createRoutine')
const getRoutineController = require('./controller/getRoutineController')

const router = express.Router()

//default route
router.get('/', (req,res)=>res.status(200).json({msg:"api working"}))

//create day schedule
router.post('/routine', createRoutineController)

//get day schedule 
router.get('/routine/:idUser', getRoutineController)

module.exports = router