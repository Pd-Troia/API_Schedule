const express = require('express')
const userGroupController = require('../controllers/userGroupController')
const validateUserGroupMiddleware = require('../middlewares/validatorUserGroupMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')


const router = express.Router()

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