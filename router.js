const express = require('express')
const routineController = require('./controllers/RoutineController')
const validateMiddleware = require('./middlewares/validatorRoutineMiddleware')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',  validateMiddleware.validatePost, routineController.createRoutine)

//get day schedule 
router.get('/routine/:idUser',validateMiddleware.validateGet,routineController.getRoutine)

//remove day schedule
router.delete('/routine/:idRoutine', validateMiddleware.validateDelete,routineController.deleteRoutine)

//Update Routine
router.put('/routine/:idRoutine', validateMiddleware.validatePut,routineController.updateRoutine)

//get coincident routime times
router.get('/coincident/:idsRoutine',validateMiddleware.validateGetCoincidentTimes, routineController.getCoincidingTimes)

module.exports = router