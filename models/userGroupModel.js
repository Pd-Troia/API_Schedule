const mongoose = require('mongoose')
const schema = mongoose.Schema({
    admin: {type: mongoose.Types.ObjectId, ref: "User"},
    members: [{
        idUser: {type: mongoose.Types.ObjectId, ref: "User"},
        routineId: {type: mongoose.Types.ObjectId,ref:"Routine"}
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
const createUserGroup = async(idAdmin, idRoutineAdmin)=>{
    try{
        const group = await userGroup(
            {
                admin: idAdmin,
                members:[
                    {
                    idUser: idAdmin,
                    idRoutine: idRoutineAdmin
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
        const query = await userGroup.findByIdAndDelete(idUserGroup)
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
        await userGroup.updateOne({_id:idUserGroup},{$push:{members:{idUser, idRoutine}}})
    
    }catch(err){
        console.log(err)
        throw new Error("Erro to insert a new member on UserGroup")
    }
}
const removeMember = async(idUser, idUserGroup)=>{
    try{
        await userGroup.updateOne({_id:idUserGroup}, {$pull: {idUser}})        
    }catch(err){
        console.log(err)
        throw new Error("Erro to insert a new member on UserGroup")
    }
}
module.exports = {
    createUserGroup,
    getUserGroup,
    updateAdminUserGroup,
    updateMemberUserGroup,
    deleteUserGroup,
    removeMember,
    insertMember
}
