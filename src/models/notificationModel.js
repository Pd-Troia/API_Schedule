const mongoose = require('mongoose')
const schema = mongoose.Schema({
    idUser: {type: mongoose.Types.ObjectId, ref:"User"},    
    idSender: {type: mongoose.Types.ObjectId,ref:"User"},
    idUserGroup: {type: mongoose.Types.ObjectId,ref:"UserGroup"} 
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

const getNotificationByEmail = async(idUser)=>{
    try{
        const notification = await Notification.find({idUser})
        return notification
    }catch(err){
        console.log(err)
        throw(err)
    }
}

module.exports = {getNotificationByEmail,createNotification,deleteNotification}