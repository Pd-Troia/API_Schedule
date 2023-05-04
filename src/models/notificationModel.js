const mongoose = require('mongoose')
const schema = mongoose.Schema({
    idUser: mongoose.Types.ObjectId,    
    idSender: mongoose.Types.ObjectId,
    idUserGroup: mongoose.Types.ObjectId 
})
const Notification = mongoose.model("notification",schema)

const createNotification = async(idUser,idSender,idUserGroup) =>{
    try{
        const notification = Notification({idUser,idSender,idUserGroup})
        await notification.save()
        return notification
    }catch(err){
        console.log(err)
        throw(err)             
    }
}
const deleteNotification = async(idNotification)=>{
    try{
        const notification = await Notification.findOneAndDelete(idNotification)
        return notification
    }catch(err){
        console.log(err)
        throw(err)
    }
}

const getNotificationByIdUser = async(idUser)=>{
    try{
        const notification = await Notification.find({idUser})
        return notification
    }catch(err){
        console.log(err)
        throw(err)
    }
}

module.exports = {getNotificationByIdUser,createNotification,deleteNotification}