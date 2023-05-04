const express = require('express')
const notificationController = require('../controllers/notificationController') 

const router = express.Router()

// create notification
router.post("/notification",notificationController.createNotification)

//get notification "web socket"
router.get("/notification")

//Delete notification 
router.delete("/notification",notificationController.deleteNotification)

module.exports = router
