const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next) =>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]      
    const secret = process.env.SECRET
    if(!token){
        return res.status(401).json({msg:'Token não fornecido'})
    }
    try{
        jwt.verify(token,secret,{algorithms:"HS256"})           
        const decoded = jwt.decode(token)        
        if(decoded){
            req.user = decoded
        }else{
            return res.status(401).json({msg:'Token inválido'})
        }                
        if(Math.floor(Date.now()/1000) > decoded.exp){
            return res.status(401).json({msg:'Token expirado'})
        }
        next()        
    }catch(err){
        console.log(err)
        return res.status(401).json({msg:'Token inválido'})
    }    
}
module.exports = {
    authenticateUser
}