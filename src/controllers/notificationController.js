const notificationModel = require('../models/notificationModel')

const createNotification = async(req,res)=>{    
    const {idSender,idTarget,idUserGroup} = req.body
    try{
        await notificationModel.createNotification(idSender,idTarget,idUserGroup)
        res.status(200).json({msg:"Notificação criada com sucesso"})
    }catch(err){
        res.status(400).json({msg:"Ocorreu um erro ao tentar criar a notificação"})
    }
}
const deleteNotification = async(req,res)=>{
    const {idNotification} = req.body
    try{
        await notificationModel.deleteNotification(idNotification)
        res.status(200).json({msg:"Notificação deletada com sucesso"})
    }catch(err){
        res.status(400).json({msg:"Ocorreu um erro ao tentar deletar a notificação"})
    }
}
 const getNotification = async(req,res)=>{
    const {email} = req.body
    try{
        const notifications = await notificationModel.getNotificationByEmail(email)
        res.status(200).json(notifications)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createNotification,deleteNotification,getNotification 
}