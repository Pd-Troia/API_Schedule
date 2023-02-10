require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router') 

const app = express()
//configs 
app.use(express.json())
app.use(cors())
app.use(router)




module.exports = app
    

