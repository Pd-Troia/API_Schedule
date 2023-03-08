const routineModel = require('../models/routineModel')
const confirmRoutineOwnerByIdUserParams = async(req,res,next)=>{
    const idUserByAuth = req.user.id     
    if(idUserByAuth != req.params.idUser){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}
const confirmRoutineOwnerByIdRoutineParams = async(req,res,next)=>{
    const idUserByAuth = req.user.id 
    const routine = await routineModel.getRoutineByIdRoutine(req.params.idRoutine)    
    if(idUserByAuth != routine[0].idUser){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}
const confirmRoutineOwnerByIdRoutineBody = async(req,res,next)=>{
    const idUserByAuth = req.user.id
    const {idUser} = req.body     
    if(idUserByAuth != idUser){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}
const confirmRoutineOwnerByMultipleIdRoutineParams = async(req,res,next)=>{
    const idUserByAuth = req.user.id 
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId.split("&")       
    const query = await routineModel.getRoutineByIdRoutine(_id)
    let founded = false
    for(i=0;i<query.length;i++){
        if(query[i].idUser == idUserByAuth){
            founded = true
        }
    }
    if(!founded){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}
module.exports = {
    confirmRoutineOwnerByIdUserParams,
    confirmRoutineOwnerByIdRoutineParams,
    confirmRoutineOwnerByMultipleIdRoutineParams,
    confirmRoutineOwnerByIdRoutineBody
}