const express = require('express')
const routineController = require('./controllers/RoutineController')
const validateMiddleware = require('./middlewares/validatorRoutineMiddleware')
const userGroupController = require('./controllers/userGroupController')

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

// UserGroup Routes

//Create Group
router.post('/usergroup/creategroup', userGroupController.creteUserGroup)

// Get User Group
router.get('/usergroup/getUserGroup/:idUser', userGroupController.getUserGroup )

//Update Admin User Group
router.patch('/usergroup/creategroup', userGroupController.getUserGroup )

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup', userGroupController.deleteUserGroup)

//Insert Member in Group
router.patch('/usergroup/insertmember/:idUserGroup', userGroupController.insertMember)

//Remove Member in group
router.patch('/usergroup/deletemember/:idUserGroup', userGroupController.deleteMember)
module.exports = router