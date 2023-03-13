require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require("./swagger.json")
const router = require('./router') 

const app = express()
//configs 
app.use(express.json())
app.use(cors())
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerFile))
app.use(router)




module.exports = app
    

