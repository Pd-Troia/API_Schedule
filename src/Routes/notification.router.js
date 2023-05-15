const express = require('express')
const notificationController = require('../controllers/notificationController') 
const isDev = require("../services/routes_functions/isDev")
const { authenticateUser } = require('../middlewares/authenticationMiddleware')
const valNotMiddleware = require('../middlewares/validatorNotificationMiddleware')
const router = express.Router()

// create notification
router.post("/notification",
    isDev(authenticateUser),
    valNotMiddleware.validateCreateNotification,
    notificationController.createNotification
)

//get notification "web socket"
router.get("/notification/:idUser",
    isDev(authenticateUser),
    valNotMiddleware.validateGetNotification,
    notificationController.getNotification
)

//Delete notification 
router.delete("/notification/:idNotification",
    isDev(authenticateUser),
    valNotMiddleware.validateDeleteNotification,
    notificationController.deleteNotification
)

module.exports = router
