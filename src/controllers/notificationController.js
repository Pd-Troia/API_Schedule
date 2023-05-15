const notificationModel = require('../models/notificationModel')

const createNotification = async(req,res)=>{    
    const {idSender,email,idUserGroup} = req.body
    try{
        await notificationModel.createNotification(idSender,email,idUserGroup)
        res.status(200).json({msg:"Notificação criada com sucesso"})
    }catch(err){
        res.status(400).json({msg:"Ocorreu um erro ao tentar criar a notificação"})
    }
}
const deleteNotification = async(req,res)=>{
    const idNotification = req.params.idNotification    
    try{
        await notificationModel.deleteNotification(idNotification)
        res.status(200).json({msg:"Notificação deletada com sucesso"})
    }catch(err){
        res.status(400).json({msg:"Ocorreu um erro ao tentar deletar a notificação"})
    }
}
 const getNotification = async(req,res)=>{
    const idUser = req.params.idUser     
    
    try{        
        const notifications = await notificationModel.getNotification(idUser)            
        return res.status(200).json({notificaions: notifications})        
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createNotification,deleteNotification,getNotification 
}