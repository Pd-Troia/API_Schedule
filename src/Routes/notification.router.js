const express = require('express')

const router = express.Router()

// create notification
router.post("/notification")

//get notification "web socket"
router.get("/notification")

//Delete notification 
router.delete("/notification")

module.exports = router
