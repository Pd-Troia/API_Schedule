const express = require('express')
const routineController = require('../controllers/routineController')
const validateRoutineMiddleware = require('../middlewares/validatorRoutineMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const isDev = require("../services/routes_functions/isDev")

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',     
    isDev(authenticationMiddleware.authenticateUser),
    validateRoutineMiddleware.validatePost, 
    isDev(authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody),
    routineController.createRoutine
)

//get day schedule 
router.get('/routine/:idUser',
    isDev(authenticationMiddleware.authenticateUser),
    validateRoutineMiddleware.validateGet,
    isDev(authorizationMiddleware.confirmRoutineOwnerByIdUserParams),
    routineController.getRoutine
)

//remove day schedule
router.delete('/routine/:idRoutine', 
    isDev(authenticationMiddleware.authenticateUser),
    validateRoutineMiddleware.validateDelete,
    isDev(authorizationMiddleware.confirmIdentityByIdRoutineParams),
    routineController.deleteRoutine
)

//Update Routine
router.put('/routine/:idRoutine', 
    isDev(authenticationMiddleware.authenticateUser),
    validateRoutineMiddleware.validatePut,
    isDev(authorizationMiddleware.confirmIdentityByIdRoutineParams),
    routineController.updateRoutine
)

//get coincident routime times
router.get('/coincident/:idsRoutine',
    isDev(authenticationMiddleware.authenticateUser),
    validateRoutineMiddleware.validateGetCoincidentTimes,
    isDev(authorizationMiddleware.confirmRoutineOwnerByMultipleIdRoutineParams),
    routineController.getCoincidingTimes
)




module.exports = router