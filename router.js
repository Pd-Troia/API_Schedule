const express = require('express')
const routineController = require('./controllers/RoutineController')
const validateRoutineMiddleware = require('./middlewares/validatorRoutineMiddleware')
const userGroupController = require('./controllers/userGroupController')
const validateUserGroupMiddleware = require('./middlewares/validatorUserGroupMiddleware')

const router = express.Router()

//default route
router.get('/',(req,res)=> res.status(200).json({msg:'api working'}))

//create day schedule
router.post('/routine',     
    validateRoutineMiddleware.validatePost, 
    routineController.createRoutine
)

//get day schedule 
router.get('/routine/:idUser',
    validateRoutineMiddleware.validateGet,
    routineController.getRoutine
)

//remove day schedule
router.delete('/routine/:idRoutine', 
    validateRoutineMiddleware.validateDelete,
    routineController.deleteRoutine
)

//Update Routine
router.put('/routine/:idRoutine', 
    validateRoutineMiddleware.validatePut,
    routineController.updateRoutine
)

//get coincident routime times
router.get('/coincident/:idsRoutine',
    validateRoutineMiddleware.validateGetCoincidentTimes,
    routineController.getCoincidingTimes
)


// UserGroup Routes


//Create Group
router.post('/usergroup/creategroup',
    validateUserGroupMiddleware.validateCreateUserGroup,
    userGroupController.creteUserGroup
)

// Get User Group
router.get('/usergroup/getusergroup/:idUser',
    validateUserGroupMiddleware.validateGetUserGroup,
    userGroupController.getUserGroup,
)

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup', 
validateUserGroupMiddleware.validateDeleteUserGroup,
userGroupController.deleteUserGroup)

//Update Admin User Group
router.patch('/usergroup/updateadmin/:idUserGroup', 
    validateUserGroupMiddleware.validateUpdateAdminUserGroup,
    userGroupController.updateAdminUserGroup 
)

//Insert Member in Group
router.patch('/usergroup/insertmember/:idUserGroup', userGroupController.insertMember)

//Remove Member in group
router.patch('/usergroup/deletemember/:idUserGroup', userGroupController.deleteMember)

module.exports = router