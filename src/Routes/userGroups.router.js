const express = require('express')
const userGroupController = require('../controllers/userGroupController')
const validateUserGroupMiddleware = require('../middlewares/validatorUserGroupMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const isDev = require("../services/routes_functions/isDev")

const router = express.Router()

//Create Group
router.post('/usergroup/creategroup',
    isDev(authenticationMiddleware.authenticateUser),
    validateUserGroupMiddleware.validateCreateUserGroup,
    isDev(authorizationMiddleware.confirmRoutineOwnerByIdRoutineBody), 
    isDev(authorizationMiddleware.confirmRoutineOwnerByIdRoutineBodyQueryBD),       
    userGroupController.creteUserGroup
)

// Get User Group
router.get('/usergroup/getusergroup/:idUser',
    isDev(authenticationMiddleware.authenticateUser),
    validateUserGroupMiddleware.validateGetUserGroup,
    isDev(authorizationMiddleware.confirmIdentityByIdUserParams),
    userGroupController.getUserGroup,
)

//Delete User Group
router.delete('/usergroup/deletegroup/:idUserGroup',
    isDev(authenticationMiddleware.authenticateUser), 
    validateUserGroupMiddleware.validateDeleteUserGroup,
    isDev(authorizationMiddleware.confirmAdminUserGroup),
    userGroupController.deleteUserGroup)

//Update Admin User Group
router.patch('/usergroup/updateadmin/:idUserGroup', 
    isDev(authenticationMiddleware.authenticateUser),
    validateUserGroupMiddleware.validateUpdateAdminUserGroup,
    isDev(authorizationMiddleware.confirmAdminUserGroup),
    userGroupController.updateAdminUserGroup 
)

//Insert Member in Group
router.patch('/usergroup/insertmember/:idUserGroup', 
    isDev(authenticationMiddleware.authenticateUser),
    validateUserGroupMiddleware.validateInsertMember,
    isDev(authorizationMiddleware.confirmAdminUserGroup),
    isDev(authorizationMiddleware.confirmRoutineOwnerByIdRoutineIdUserBody),
    userGroupController.insertMember
)

//Remove Member in group
router.patch('/usergroup/deletemember/:idUserGroup', 
    isDev(authenticationMiddleware.authenticateUser),
    validateUserGroupMiddleware.validateDeleteMember,    
    isDev(authorizationMiddleware.confirmAdminUserGroup),    
    userGroupController.deleteMember
)

module.exports = router