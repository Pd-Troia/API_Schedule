const mongoose = require('mongoose')
const routineModel = require('../models/routineModel')
const userModel = require('../models/userModel')
//validate functions
const vUserPayload = (resHandle,idUser) =>{
    if(!idUser){
        resHandle.status(400).json({msg:"IdUser não foi enviado"})
        return true
    }
}
const vRoutinePayload = (resHandle,idRoutine) =>{
    if(!idRoutine){
        resHandle.status(400).json({msg:"IdRoutine não foi enviado"})
        return true
    }
}
const vUserObjectId = (resHandle,idUser) =>{
    if(!mongoose.Types.ObjectId.isValid(idUser)){
        resHandle.status(400).json({msg:"IdUser não é um id válido"})
        return true
    }
}
const vRoutineObjectId = (resHandle,idRoutine) =>{
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        resHandle.status(400).json({msg:"IdRoutine não é um id válido"})
        return true
    }
}
const vUserExists = async(resHandle,idUser)=>{
    try{           
        const user = await userModel.getUser(idUser)
        if(!user){
            resHandle.status(404).json({msg:"O id do usuário é válido, porém não existe"}) 
            return true
        }
    }catch(err){
        console.log(err)    
    }
}
const vRoutineExists = async(resHandle,idRoutine)=>{
    try{           
        const routineExists = (await routineModel.getRoutineByIdRoutine(idRoutine)).length > 0        
        if(!routineExists){
            resHandle.status(404).json({msg:"O id da rotina é válido, porém não existe"}) 
            return true
        }  
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro no servidor"})         
    }
}

//validadte responses
const validateCreateUserGroup = async(req,res,next) => {
    const {idUser,idRoutine} = req.body
    if(vUserPayload(res,idUser)){return}
    if(vRoutinePayload(res,idRoutine)){return}    
    if(vUserObjectId(res,idUser)){return}
    if(vRoutineObjectId(res,idRoutine)){return}   
    if(await vUserExists(res,idUser)){return}
    if(await vRoutineExists(res,idRoutine)){return}   
    next()
} 

const validateGetUserGroup = (req,res,next) => {
    
    next()
} 

const validateUpdateUserGroup = (req,res,next) => {
    next()
}

module.exports = {
    validateCreateUserGroup
}