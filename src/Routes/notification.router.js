const express = require('express')
const notificationController = require('../controllers/notificationController') 
const isDev = require("../services/routes_functions/isDev")
const { authenticateUser } = require('../middlewares/authenticationMiddleware')
const router = express.Router()

// create notification
router.post("/notification",
    isDev(authenticateUser),
    notificationController.createNotification
)

//get notification "web socket"
router.get("/notification",
    isDev(authenticateUser)
)

//Delete notification 
router.delete("/notification",
    isDev(authenticateUser),
    notificationController.deleteNotification
)

module.exports = router
