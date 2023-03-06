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

//validadte responses
const validateCreateUserGroup = async(req,res,next) => {
    const {idUser,idRoutine} = req.body
    if(!idUser){
        return res.status(400).json({msg:"IdUser não foi enviado"})
    }
    if(!idRoutine){
        return res.status(400).json({msg:"IdRoutine não foi enviado"})
    }
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        return res.status(400).json({msg:"IdRoutine não é um id válido"})
    }
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        return res.status(400).json({msg:"IdRoutine não é um id válido"})
    }   
    try{           
        const user = await userModel.getUser(idUser)
        if(!user){
            return res.status(404).json({msg:"O id do usuário é válido, porém não existe"}) 
        }
    }catch(err){
        console.log(err)
    
    }
    try{           
        const routineExists = (await routineModel.getRoutineByIdRoutine(idRoutine)).length > 0        
        if(!routineExists){
            return res.status(404).json({msg:"O id da rotina é válido, porém não existe"}) 
        }  
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro no servidor"})         
    }
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