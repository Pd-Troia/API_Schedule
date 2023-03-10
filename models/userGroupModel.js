const mongoose = require('mongoose')
const schema = mongoose.Schema({
    admin: {type: mongoose.Types.ObjectId, ref: "User"},
    members: [{
        idUser: {type: mongoose.Types.ObjectId, ref: "User"},
        idRoutine: {type: mongoose.Types.ObjectId,ref:"Routine"}
    }]
})
const userGroup = mongoose.model("UserGroup", schema )

const getUserGroup = async(userId) => {
    try{
        const groups = await userGroup.find({ members: { $elemMatch: { idUser: userId } } })
        return groups
    }catch(err){
        console.log(err)
        throw new Error("Error to find UserGroup")
    }
}
const getUserGroupByUserGroupId = async(userGroupId) => {
    try{
        const group = await userGroup.findById(userGroupId)
        return group    
    }catch(err){
        console.log(err)
        throw new Error("Error to find UserGroup")
    }
}
const createUserGroup = async(idAdmin, idRoutineAdmin)=>{
    try{
        const group = await userGroup(
            {
                admin: idAdmin,
                members:[
                    {
                    idRoutine: idRoutineAdmin,
                    idUser: idAdmin
                    }
                ]
            }
        )
        await group.save()
        return group
    }catch(err){
        console.log(err)
        throw new Error('Error to create UserGroup')
    }
}
const deleteUserGroup = async(idUserGroup) =>{
    try{
        const query = await userGroup.findByIdAndDelete({_id:idUserGroup})
        return query 
    }catch(err){
        console.log(err)
        throw new Error('Error to delete UserGroup')
    }
}
const updateMemberUserGroup = async(idUserGroup, members)=>{
    try{
        const query = await userGroup.findByIdAndUpdate(idUserGroup, {members})
        return query
    }catch(err){
        console.log(err)
        throw new Error('Error to update member UserGroup')
    }
}
const updateAdminUserGroup = async(idUserGroup, idAdmin)=>{
    try{
        const query = await userGroup.findByIdAndUpdate(idUserGroup, {admin:idAdmin})
        return query 
    }catch(err){
        console.log(err)
        throw new Error('Error to update member UserGroup')
    }
}
const insertMember = async(idUser,idRoutine,idUserGroup)=>{
    try{
        const query = await userGroup.updateOne({_id:idUserGroup},{$push:{members:{idUser: idUser, idRoutine:idRoutine}}})        
        return query.matchedCount > 0
    }catch(err){    
        console.log(err)
        throw new Error("Erro to insert a new member on UserGroup")
    }
}
const removeMember = async(idUser, idUserGroup)=>{
    try{
        const query = await userGroup.updateOne({_id:idUserGroup}, {$pull: {members:{idUser:idUser}}})   
        return query       
    }catch(err){
        console.log(err)
        throw new Error("Erro to insert a new member on UserGroup")
    }
}

module.exports = {
    createUserGroup,
    getUserGroup,
    getUserGroupByUserGroupId,
    updateAdminUserGroup,
    updateMemberUserGroup,
    deleteUserGroup,
    removeMember,
    insertMember
}
