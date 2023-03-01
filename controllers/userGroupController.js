const userGroupModel = require('../models/userGroupModel')
const creteUserGroup = async(req,res) =>{ 
    const {idAdmin,idRoutine} = req.body
    try{
        await userGroupModel.createUserGroup(idAdmin, idRoutine)
        return res.status(200).json({msg:"Grupo criado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro ao criar o userGroup"})
    }
}
const getUserGroup = async(req,res) =>{
    const {idUser} = req.params.idUser
    try{
        const groups = await userGroupModel.getUserGroup(idUser)
        return res.status(200).json({groups})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro ao consultar o userGroup"})
    }
}
const deleteUserGroup = async (req,res) =>{
    const {idUserGroup} = req.params.idUserGroup
    try{
        await userGroupModel.deleteUserGroup(idUserGroup)
        return res.status(200).json({msg:"Grupo deletado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar deletar o userGroup"})
    }
}
const updateAdminUserGroup = async(req,res) =>{
    const {newidAdmin} = req.body
    try{
        await userGroupModel.updateAdminUserGroup(newidAdmin)
        return res.status(200).json({msg:"Admin alterado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar modificar admin do userGroup"})
    }
}

const insertMember = async(req,res) =>{
    const {idUser,idRoutine,idUserGroup} = req.body
    try{
       await userGroupModel.insertMember(idUser,idRoutine,idUserGroup)
       return res.status(200).json({msg:'Membro inserido com sucesso'})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar inserir um usuário ao userGroup"})
    }
}
const deleteMember = async(req,res) =>{
    const idUserGroup = req.params.idUserGroup
    const {idUser} = req.body
    try{
        await userGroupModel.removeMember(idUser,idUserGroup)
        return res.status(200).json({msg:'Membro removido com sucesso'})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar inserir um usuário ao userGroup"})
    }
}
module.exports = {
    creteUserGroup,
    getUserGroup,
    updateAdminUserGroup,
    deleteUserGroup,
    insertMember,
    deleteMember
}
