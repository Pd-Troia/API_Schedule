const mongoose = require('mongoose')

const schema = mongoose.Schema({
    idSender: {type: mongoose.Types.ObjectId, ref:"User"},    
    idTarget: {type: mongoose.Types.ObjectId,ref:"User"},
    idUserGroup: {type: mongoose.Types.ObjectId,ref:"UserGroup"} 
})
const Notification = mongoose.model("notification",schema)

const createNotification = async(idSender,idTarget,idUserGroup) =>{
    try{
        const notification = Notification({idSender,idTarget,idUserGroup})
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

const getNotificationByEmail = async(email)=>{
    try{
        const notification = await Notification.aggregate(
            [
                {
                    $lookup:
                    {
                        from:"users",
                        localField:"idTarget",
                        foreignField: "_id",
                        as: "userNotifications"
                    }
                },
                {
                    $match:
                    {
                        'userNotifications.email':email
                    }
                },
                {
                    $project: {
                        userNotifications:0
                    }
                  }
            ]
        )
        console.log(notification)
        return notification
    }catch(err){
        console.log(err)
        throw(err)
    }
}

module.exports = {getNotificationByEmail,createNotification,deleteNotification}