const express = require('express')
const routineController = require('./controllers/RoutineController')
const validateRoutineMiddleware = require('./middlewares/validatorRoutineMiddleware')
const userGroupController = require('./controllers/userGroupController')
const validateUserGroupMiddleware = require('./middlewares/validatorUserGroupMiddleware')
const authorizationRoutineMiddleware = require('./middlewares/authorizationRoutineMiddleware')
const authenticationMiddleware = require('./middlewares/authenticationMiddleware')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',     
    validateRoutineMiddleware.validatePost, 
    authenticationMiddleware.authenticateUser,
    authorizationRoutineMiddleware.confirmRoutineOwnerByIdRoutineBody,
    routineController.createRoutine
)

//get day schedule 
router.get('/routine/:idUser',
    validateRoutineMiddleware.validateGet,
    authenticationMiddleware.authenticateUser,
    authorizationRoutineMiddleware.confirmRoutineOwnerByIdUserParams,
    routineController.getRoutine
)

//remove day schedule
router.delete('/routine/:idRoutine', 
    validateRoutineMiddleware.validateDelete,
    authenticationMiddleware.authenticateUser,
    authorizationRoutineMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.deleteRoutine
)

//Update Routine
router.put('/routine/:idRoutine', 
    validateRoutineMiddleware.validatePut,
    authenticationMiddleware.authenticateUser,
    authorizationRoutineMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.updateRoutine
)

//get coincident routime times
router.get('/coincident/:idsRoutine',
    validateRoutineMiddleware.validateGetCoincidentTimes,
    authenticationMiddleware.authenticateUser,
    authorizationRoutineMiddleware.confirmRoutineOwnerByMultipleIdRoutineParams,
    routineController.getCoincidingTimes
)


// UserGroup Routes


//Create Group
router.post('/usergroup/creategroup',
    validateUserGroupMiddleware.validateCreateUserGroup,
    authenticationMiddleware.authenticateUser,    
    userGroupController.creteUserGroup
)

// Get User Group
router.get('/usergroup/getusergroup/:idUser',
    validateUserGroupMiddleware.validateGetUserGroup,
    authenticationMiddleware.authenticateUser,
    userGroupController.getUserGroup,
)

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup',
    validateUserGroupMiddleware.validateDeleteUserGroup,
    authenticationMiddleware.authenticateUser, 
    userGroupController.deleteUserGroup)

//Update Admin User Group
router.patch('/usergroup/updateadmin/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateUpdateAdminUserGroup,
    userGroupController.updateAdminUserGroup 
)

//Insert Member in Group
router.patch('/usergroup/insertmember/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateInsertMember,
    userGroupController.insertMember
)

//Remove Member in group
router.patch('/usergroup/deletemember/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateDeleteMember,
    userGroupController.deleteMember
)

module.exports = router