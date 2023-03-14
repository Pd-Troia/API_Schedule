const mongoose = require('mongoose')
const routineValidator = require('../services/validations/routineValidator')
const routineModel = require('../models/routineModel')

const validateDelete =async (req,res,next) =>{
    const idRoutine = req.params.idRoutine    
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        return res.status(400).json({msg:"O id fornecido para deletar é inválido"})
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
    if(!mongoose.Types.ObjectId.isValid(idUser)){
        return res.status(400).json({msg:"O id fornecido para requisitar a rotina é inválido"})
    }
    next()
}
const validatePost = async(req,res,next) => {
    const {idUser,intervals} = req.body
    if(!idUser){
        return res.status(404).json({msg:"idUser não informado"})
    }
    if(!mongoose.Types.ObjectId.isValid(idUser)){
        return res.status(400).json({msg:"O idUser é inválido"})
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
    if(!mongoose.Types.ObjectId.isValid(idRoutine)){
        return res.status(400).json({msg:"O id fornecido para edição é inválido"})
    }
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
    for(let i = 0; i<_id.length;i++){
        if(!mongoose.Types.ObjectId.isValid(_id[i])){
            return res.status(400).json({msg:`O elemento ${_id[i]} é não é um id válido, informe as rotinas dividindo cada rotina com & ex: IdRotina1&IdRotina2`})
        }
    }
    const query = await routineModel.getRoutineByIdRoutine(_id)   
    const routinesNotFounded = routineValidator.notFoundRoutine(_id,query)
    if(routinesNotFounded.length > 0){
        return res.status(400).json({msg:"Algumas rotinas não foram encontradas",routinesNotFounded})
    }
    next()
}

module.exports = {validateDelete,validateGet, validatePost, validatePut,validateGetCoincidentTimes}