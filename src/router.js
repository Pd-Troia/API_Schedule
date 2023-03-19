const express = require('express')
const routineController = require('./controllers/RoutineController')
const validateRoutineMiddleware = require('./middlewares/validatorRoutineMiddleware')
const userGroupController = require('./controllers/userGroupController')
const validateUserGroupMiddleware = require('./middlewares/validatorUserGroupMiddleware')
const authorizationMiddleware = require('./middlewares/authorizationMiddleware')
const authenticationMiddleware = require('./middlewares/authenticationMiddleware')

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


// UserGroup Routes


//Create Group
router.post('/usergroup/creategroup',
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateCreateUserGroup,
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody, 
    authorizationMiddleware.confirmRoutineOwnerByIdRoutineBodyQueryBD,       
    userGroupController.creteUserGroup
)

// Get User Group
router.get('/usergroup/getusergroup/:idUser',
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateGetUserGroup,
    authorizationMiddleware.confirmRoutineOwnerByIdUserParams,
    userGroupController.getUserGroup,
)

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup',
    authenticationMiddleware.authenticateUser, 
    validateUserGroupMiddleware.validateDeleteUserGroup,
    authorizationMiddleware.confirmAdminUserGroup,
    userGroupController.deleteUserGroup)

//Update Admin User Group
router.patch('/usergroup/updateadmin/:idUserGroup', 
    authenticationMiddleware.authenticateUser,
    validateUserGroupMiddleware.validateUpdateAdminUserGroup,
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