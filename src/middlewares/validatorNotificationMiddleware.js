const userModel = require("../models/userModel")
const userGroupModel = require("../models/userGroupModel")
const notificationModel = require("../models/notificationModel")
const mongoose = require('mongoose')

const validateCreateNotification = async(req,res,next)=>{
    const {idSender,email,idUserGroup} = req.body
    // validate payload
    if(!idSender){return res.status(404).json({msg:"IdSender não enviado"})}
    if(!email){return res.status(404).json({msg:"Email não enviado"})}
    if(!idUserGroup){return res.status(404).json({msg:"IdUserGroup não enviado"})}
    // validate ids
    if(!mongoose.Types.ObjectId.isValid(idSender)){return res.status(404).json({msg:"IdSender é inválido"})}
    if(!mongoose.Types.ObjectId.isValid(idUserGroup)){return res.status(404).json({msg:"IdUserGroup é inválido"})}
    // validade if exists
    const target = await userModel.getUserByEmail(email)    
    if(!target){return res.status(404).json({msg:"Usuário não encontrado pelo email"})}
    if(!(await userModel.getUser(idSender))){return res.status(404).json({msg:"Usuário não encontrado pelo idSender"})}
    if(!(await userGroupModel.getUserGroupByUserGroupId(idUserGroup))){
        return res.status(404).json({msg:"UserGroup não encontrado pelo idUserGroup"})
    }
    // verify if target is not the same person
    if(target._id.toString() == idSender){
        return res.status(400).json({msg:"Não pode criar uma notificação para você mesmo"})
    }   
    next()
}

const validateDeleteNotification = async(req,res,next)=>{
    const idNotification = req.params.idNotification    
    // validate ids
    if(!mongoose.Types.ObjectId.isValid(idNotification)){return res.status(404).json({msg:"IdNotification é inválido"})}    
    // validade if exists
    const notification = await notificationModel.getNotificationByidNotification(idNotification)        
    if(!notification){
        return res.status(404).json({msg:"Notificação não encontrada"})
    }
    req.notification = notification
   next()
}

const validateGetNotification = async(req,res,next)=>{
    const idUser = req.params.idUser    
    // validate ids
    if(!mongoose.Types.ObjectId.isValid(idUser)){return res.status(404).json({msg:"IdUser é inválido"})}    
    // validade if exists
    const user = await userModel.getUser(idUser)    
    if(!user){
        return res.status(404).json({msg:"Usuário não encontrado"})
    }
   next()
}



module.exports = {validateCreateNotification,validateDeleteNotification,validateGetNotification}