const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next) =>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]      
    const secret = process.env.SECRET
    if(!token){
        return res.status(401).json({msg:'Token não fornecido'})
    }
    try{
        const decoded = jwt.decode(token,secret)
        console.log(decoded)
        if(decoded){
            req.user = decoded
            next()
        }else{
            return res.status(401).json({msg:'Token inválido'})
        }
    }catch(err){
        console.log(err)
        return res.status(401).json({msg:'Token inválido'})
    }    
}
module.exports = {
    authenticateUser
}