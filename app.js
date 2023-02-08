require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router')

//enviorment variables
const user = process.env.DB_USER
const password = process.env.DB_PASS 
const port = process.env.PORT    

const app = express()
//configs 
app.use(express.json())
app.use(cors())
app.use(router)
mongoose.set("strictQuery", false);

//starting app        
mongoose
.connect(`mongodb+srv://${user}:${password}@cluster0.qzrwirw.mongodb.net/?retryWrites=true&w=majority`)    
.then(()=>{
    app.listen(port || 3333)
    console.log("App listen on port " + port)
})
.catch((err)=> console.log(err))    
    

