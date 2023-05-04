const notificationModel = require('../models/notificationModel')

const createNotification = async(req,res)=>{
    const idUser = req.user.id
    const {idSender,idUserGroup} = req.body
    try{
        await notificationModel.createNotification(idUser,idSender,idUserGroup)
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
 const getNotification = (req,res)=>{
    
}

module.exports = {
    createNotification,deleteNotification,getNotification 
}