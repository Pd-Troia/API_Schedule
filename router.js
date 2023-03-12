const express = require('express')
const routineController = require('./src/controllers/RoutineController')
const validateRoutineMiddleware = require('./src/middlewares/validatorRoutineMiddleware')
const userGroupController = require('./src/controllers/userGroupController')
const validateUserGroupMiddleware = require('./src/middlewares/validatorUserGroupMiddleware')
const authorizationMiddleware = require('./src/middlewares/authorizationMiddleware')
const authenticationMiddleware = require('./src/middlewares/authenticationMiddleware')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',     
    validateRoutineMiddleware.validatePost, 
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody,
    routineController.createRoutine
)

//get day schedule 
router.get('/routine/:idUser',
    validateRoutineMiddleware.validateGet,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdUserParams,
    routineController.getRoutine
)

//remove day schedule
router.delete('/routine/:idRoutine', 
    validateRoutineMiddleware.validateDelete,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.deleteRoutine
)

//Update Routine
router.put('/routine/:idRoutine', 
    validateRoutineMiddleware.validatePut,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineParams,
    routineController.updateRoutine
)

//get coincident routime times
router.get('/coincident/:idsRoutine',
    validateRoutineMiddleware.validateGetCoincidentTimes,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByMultipleIdRoutineParams,
    routineController.getCoincidingTimes
)


// UserGroup Routes


//Create Group
router.post('/usergroup/creategroup',
    validateUserGroupMiddleware.validateCreateUserGroup,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody, 
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBodyQuery,       
    userGroupController.creteUserGroup
)

// Get User Group
router.get('/usergroup/getusergroup/:idUser',
    validateUserGroupMiddleware.validateGetUserGroup,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmRoutineOwnerByIdUserParams,
    userGroupController.getUserGroup,
)

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup',
    validateUserGroupMiddleware.validateDeleteUserGroup,
    authenticationMiddleware.authenticateUser, 
    authorizationMiddleware.confirmAdminUserGroup,
    userGroupController.deleteUserGroup)

//Update Admin User Group
router.patch('/usergroup/updateadmin/:idUserGroup', 
    validateUserGroupMiddleware.validateUpdateAdminUserGroup,
    authenticationMiddleware.authenticateUser,
    authorizationMiddleware.confirmAdminUserGroup,
    userGroupController.updateAdminUserGroup 
)

//Insert Member in Group
router.patch('/usergroup/insertmember/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateInsertMember,
    authorizationMiddleware.confirmAdminUserGroup,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineIdUserBody,
    userGroupController.insertMember
)

//Remove Member in group
router.patch('/usergroup/deletemember/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateDeleteMember,    
    authorizationMiddleware.confirmAdminUserGroup,    
    userGroupController.deleteMember
)

module.exports = router