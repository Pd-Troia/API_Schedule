const express = require('express')
const notificationController = require('../controllers/notificationController') 
const isDev = require("../services/routes_functions/isDev")
const { authenticateUser } = require('../middlewares/authenticationMiddleware')
const valNotMiddleware = require('../middlewares/validatorNotificationMiddleware')
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const router = express.Router()

// create notification
router.post("/notification",
    isDev(authenticateUser),
    valNotMiddleware.validateCreateNotification,
    isDev(authorizationMiddleware.confirmAdminUserGroupByBody),
    notificationController.createNotification
)

//get notification "web socket"
router.get("/notification/:idUser",
    isDev(authenticateUser),
    valNotMiddleware.validateGetNotification,    
    isDev(authorizationMiddleware.confirmIdentityByIdUserParams),
    notificationController.getNotification
)

//Delete notification 
router.delete("/notification/:idNotification",
    isDev(authenticateUser),    
    valNotMiddleware.validateDeleteNotification,
    isDev(authorizationMiddleware.confirmOwnerNotification),
    notificationController.deleteNotification
)

module.exports = router
