const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    failedAttempts: Number,
    blockTimestamp: Number, 
})
const user = mongoose.model('User', schema)

const getUser = async(idUser) =>{
    try{
        const query = await user.findById(idUser)                
        return query    
    }catch(err){
        console.log(err)
        throw new Error('Ocorreu um erro na consulta do User')
    }
}

module.exports = {
    getUser,    
}
