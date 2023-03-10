const mongoose = require('mongoose')
const routineModel = require('../../models/routineModel')
const userModel = require('../../models/userModel')
const userGroupModel = require('../../models/userGroupModel')
//validate functions
const vPayload = (resHandle,id,msg) =>{
    if(!id){
        resHandle.status(400).json({msg})
        return true
    }
}
const vObjectId = (resHandle,idUser,msg) =>{
    if(!mongoose.Types.ObjectId.isValid(idUser)){
        resHandle.status(400).json({msg})
        return true
    }
}
   
const vUserExists = async(resHandle,idUser,msg)=>{
    try{           
        const user = await userModel.getUser(idUser)        
        if(!user){
            resHandle.status(404).json({msg}) 
            return true
        }
    }catch(err){
        console.log(err)    
    }
    return false
}
const vUserGroupExists = async(resHandle,idUserGroup,msg)=>{
    try{           
        const userGroup = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)         
        if(!userGroup){
            resHandle.status(404).json({msg}) 
            return true
        }
    }catch(err){
        console.log(err)    
    }
    return false
}
const vRoutineExists = async(resHandle,idRoutine,msg)=>{
    try{           
        const routineExists = (await routineModel.getRoutineByIdRoutine(idRoutine)).length > 0        
        if(!routineExists){
            resHandle.status(404).json({msg}) 
            return true
        }  
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro no servidor"})         
    }
    return false
}
const vMemberInGroup = async(resHandle,idUser,idUserGroup,msg) =>{     
    const group = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)
    for(let i=0;i<group.members.length;i++){
        let firstElement = group.members[i].idUser.toString()           
        if(firstElement === idUser){
            return resHandle.status(400).json({msg})
        }
    }
    return false
}
const vMemberOutGroup = async(resHandle,idUser,idUserGroup,msg) =>{     
    const group = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)
    let founded = false
    for(let i=0;i<group.members.length;i++){  
        let firstElement = group.members[i].idUser.toString()      
        if(firstElement === idUser){
            founded = true            
        }
    }
    if(!founded){
        return resHandle.status(400).json({msg})
    }
    return false
}
const vRemoveAdmin = async(resHandle,idUser,idUserGroup,msg) =>{
    const group = await userGroupModel.getUserGroupByUserGroupId(idUserGroup)
    if(idUser == group.admin.toString()){
        return resHandle.status(403).json({msg})
    }
    return false
}


module.exports = {
    vPayload,
    vObjectId,
    vUserExists,
    vUserGroupExists,
    vRoutineExists,
    vMemberInGroup,
    vMemberOutGroup,
    vRemoveAdmin
}