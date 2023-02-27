const mongoose = require('mongoose')
const routineValidator = require('../services/validations/routineValidator')
const routineModel = require('../models/routineModel')

const validateDelete =async (req,res,next) =>{
    const idRoutine = req.params.idRoutine    
    if(mongoose.Types.ObjectId.isValid(idRoutine)){
        return res.status(400).json({msg:"O id fornecio para deletar é inválido"})
    }
    if(!idRoutine){
        return res.status(404).json({msg:'Id routine não enviado'})
    }    
    const routine = await routineModel.getRoutineByIdRoutine(idRoutine)    
    if(routine == false){        
        return res.status(404).json({msg:"Rotina não encontrada"})
    } 
    next()
}

const validateGet = async(req,res,next)=>{
    const idUser = req.params.idUser        
    if(!idUser){
        return res.status(404).json({msg:'usuário não encontrado'})
    }
    next()
}
const validatePost = async(req,res,next) => {
    const {idUser,intervals} = req.body
    if(!idUser){
        return res.status(404).json({msg:"idUser não informado"})
    }
    const errors = routineValidator.verifyConditions(intervals)
    if(errors.length > 0){
        return res.status(400).json({msg:errors})
    }
    next()
}
const validatePut = async(req,res,next) => {
    const {intervals} = req.body
    const idRoutine = req.params.idRoutine
    if(!idRoutine){
        return res.status(404).json({msg:"idRoutine não informado"})
    }
    const routine = await routineModel.getRoutineByIdRoutine(idRoutine)    
    if(routine == false){        
        return res.status(404).json({msg:"Rotina não encontrada"})
    } 
    const errors = routineValidator.verifyConditions(intervals)
    if(errors.length > 0){
        return res.status(400).json({msg:errors})
    }
    next()
}
const validateGetCoincidentTimes = async(req,res,next) =>{    
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId.split("&")    
    const query = await routineModel.getRoutineByIdRoutine(_id) 
    const routinesNotFounded = routineValidator.notFoundRoutine(query,_id)
    if(routinesNotFounded.length > 0){
        return res.status(400).json({msg:"Algumas rotinas não foram encontradas",routinesNotFounded})
    }
    next()
}

module.exports = {validateDelete,validateGet, validatePost, validatePut,validateGetCoincidentTimes}