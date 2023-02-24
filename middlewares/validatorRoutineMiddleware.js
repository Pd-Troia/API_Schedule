const routineValidator = require('../services/validations/routineValidator')
const routineModel = require('../models/routineModel')

const validateDelete =async (req,res,next) =>{
    const idRoutine = req.params.idRoutine    
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
module.exports = {validateDelete,validateGet, validatePost, validatePut}