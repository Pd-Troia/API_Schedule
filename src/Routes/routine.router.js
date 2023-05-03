const express = require('express')
const routineController = require('../controllers/RoutineController')
const validateRoutineMiddleware = require('../middlewares/validatorRoutineMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',     
    authenticationMiddleware.authenticateUser,
    validateRoutineMiddleware.validatePost, 
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody,
    routineController.createRoutine
)

//get day schedule 
router.get('/routine/:idUser',
    authenticationMiddleware.authenticateUser,
    validateRoutineMiddleware.validateGet,
    authorizationMiddleware.confirmRoutineOwnerByIdUserParams,
    routineController.getRoutine
)

//remove day schedule
router.delete('/routine/:idRoutine', 
    authenticationMiddleware.authenticateUser,
    validateRoutineMiddleware.validateDelete,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.deleteRoutine
)

//Update Routine
router.put('/routine/:idRoutine', 
    authenticationMiddleware.authenticateUser,
    validateRoutineMiddleware.validatePut,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.updateRoutine
)

//get coincident routime times
router.get('/coincident/:idsRoutine',
    authenticationMiddleware.authenticateUser,
    validateRoutineMiddleware.validateGetCoincidentTimes,
    authorizationMiddleware.confirmRoutineOwnerByMultipleIdRoutineParams,
    routineController.getCoincidingTimes
)




module.exports = router