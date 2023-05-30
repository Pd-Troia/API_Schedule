const routineModel = require('../models/routineModel')
const userGroupModel = require('../models/userGroupModel')
const notificationModel = require('../models/notificationModel')

const confirmIdentityByIdUserParams = (req,res,next)=>{
    const idUserByAuth = req.user.id     
    if(idUserByAuth != req.params.idUser){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}

const confirmRoutineOwnerByIdRoutineBody = (req,res,next)=>{
    const idUserByAuth = req.user.id
    const {idUser} = req.body     
    if(idUserByAuth != idUser){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}
const confirmRoutineOwnerByIdRoutineIdUserBody = async(req,res,next)=>{
    const {idUser,idRoutine} = req.body 
    const routine = await routineModel.getRoutineByIdRoutine(idRoutine)    
    if(idUser != routine[0].idUser.toString()){
        return res.status(403).json({msg:"A rotina não pertence ao idUser informado"})
    }
    next()
}
const confirmRoutineOwnerByIdRoutineBodyQueryBD = async(req,res,next)=>{
    const idUserByAuth = req.user.id
    const {idUser} = req.body
    const routine = await routineModel.getRoutine(idUser)     
    if(idUserByAuth != routine[0].idUser){
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
const confirmAdminUserGroup = async(req,res,next)=>{
    const idUserByAuth = req.user.id
    const idUserGroup = req.params.idUserGroup
    const userGroup = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)    
    if(idUserByAuth != userGroup.admin.toString()){
        return res.status(403).json({msg:"É necessário ser admin do grupo para realizar essa operação"})

    }
    next()
}
const confirmAdminUserGroupByBody = async(req,res,next)=>{
    const {idSender,idUserGroup} = req.body
    const idUserByAuth = req.user.id
    const userGroup = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)    
    if(!((userGroup.admin.toString() == idSender ? idSender : false) === idUserByAuth)){
        return res.status(403).json({msg:"É necessario ser admin do grupo para realizar essa operação"})
    }
    next()
}
const confirmOwnerNotification = async(req,res,next)=>{
    const notification = req.notification    
    const idUserByAuth = req.user.id    
    if(idUserByAuth != notification.idTarget){
        return res.status(403).json({msg:"Identidade não autorizada"})
    }
    next()
}




module.exports = {
    confirmIdentityByIdUserParams,
    confirmRoutineOwnerByIdRoutineParams,
    confirmRoutineOwnerByMultipleIdRoutineParams,
    confirmRoutineOwnerByIdRoutineBody,
    confirmRoutineOwnerByIdRoutineBodyQueryBD,
    confirmAdminUserGroup,
    confirmRoutineOwnerByIdRoutineIdUserBody,
    confirmAdminUserGroupByBody,
    confirmOwnerNotification
}