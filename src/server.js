const mongoose = require('mongoose')
const app = require('./app')

//enviorment variables
const user = process.env.ISDEV ?process.env.DB_USER_DEV : process.env.DB_USER
const password = process.env.ISDEV ? process.env.DB_PASS_DEV : process.env.DB_PASS 
const db = process.env.ISDEV ? process.env.DB_DEV : process.env.DB
const port = process.env.PORT  
//starting app
mongoose.set("strictQuery", false);        
mongoose
.connect(`mongodb+srv://${user}:${password}@cluster0.${db}.mongodb.net/?retryWrites=true&w=majority`)    
.then(()=>{
    app.listen(port || 3333)
    console.log("App listen on port " + port)
})
.catch((err)=> console.log(err))    