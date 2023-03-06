const mongoose = require('mongoose')
const routineModel = require('../models/routineModel')
const userModel = require('../models/userModel')
//validate functions
const vUserPayload = (resHandle,idUser) =>{
    if(!idUser){
        return resHandle.status(400).json({msg:"IdUser não foi enviado"})
    }
}
const vRoutinePayload = (resHandle,idRoutine) =>{
    if(!idRoutine){
        return resHandle.status(400).json({msg:"IdRoutine não foi enviado"})
    }
}
const vUserObjectId = (resHandle,idUser) =>{
    if(!mongoose.Types.ObjectId.isValid(idUser)){
        return resHandle.status(400).json({msg:"IdUser não é um id válido"})
    }
}
const vRoutineObjectId = (resHandle,idRoutine) =>{
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        return resHandle.status(400).json({msg:"IdRoutine não é um id válido"})
    }
}
const vUserExists = async(resHandle,idUser) =>{
    try{           
        const user = await userModel.getUser(idUser)
        if(!user){
            return resHandle.status(404).json({msg:"O id do usuário é válido, porém não existe"}) 
        }
    }catch(err){
        console.log(err)
    
    }
}
const vRoutineExists = async(resHandle,idRoutine) =>{
    try{           
        const routineExists = (await routineModel.getRoutineByIdRoutine(idRoutine)).length > 0        
        if(!routineExists){
            return resHandle.status(404).json({msg:"O id da rotina é válido, porém não existe"}) 
        }  
    }catch(err){
        console.log(err)
        return resHandle.status(500).json({msg:"Ocorreu um erro no servidor"})         
    }
}
//validadte responses
const validateCreateUserGroup = async(req,res,next) => {
    const {idUser,idRoutine} = req.body
    vUserPayload(res,idUser)
    vRoutinePayload(res,idRoutine)
    vUserObjectId(res,idUser)
    vRoutineObjectId(res,idRoutine)    
    vUserExists(res,idUser)
    vRoutineExists(res,idRoutine)
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