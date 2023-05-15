const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    failedAttempts: Number,
    blockTimestamp: Number, 
})
const User = mongoose.model('User', schema)

const getUser = async(idUser) =>{
    try{
        const query = await User.findById(idUser)                
        return query    
    }catch(err){
        console.log(err)
        throw new Error('Ocorreu um erro na consulta do User')
    }
}
const getUserByEmail = async(email) =>{
    try{
        const query = await User.findOne({email})                
        return query    
    }catch(err){
        console.log(err)
        throw new Error('Ocorreu um erro na consulta do User')
    }
}


module.exports = {
    getUser,
    getUserByEmail,
    User    
}
