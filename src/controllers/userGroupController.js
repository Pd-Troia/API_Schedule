const userGroupModel = require('../models/userGroupModel')
const creteUserGroup = async(req,res) =>{ 
    const {idUser,label,idRoutine} = req.body
    try{
        await userGroupModel.createUserGroup(idUser,label,idRoutine)
        return res.status(200).json({msg:"Grupo criado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro ao criar o userGroup"})
    }
}
const getUserGroup = async(req,res) =>{
    const idUser = req.params.idUser    
    try{
        const groups = await userGroupModel.getUserGroup(idUser)
        return res.status(200).json({groups})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro ao consultar o userGroup"})
    }
}
const deleteUserGroup = async (req,res) =>{
    const idUserGroup = req.params.idUserGroup    
    try{
        await userGroupModel.deleteUserGroup(idUserGroup)
        return res.status(200).json({msg:"Grupo deletado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar deletar o userGroup"})
    }
}
const updateAdminUserGroup = async(req,res) =>{
    const idUserGroup = req.params.idUserGroup
    const {newIdAdmin} = req.body
    try{
        await userGroupModel.updateAdminUserGroup(idUserGroup,newIdAdmin)
        return res.status(200).json({msg:"Admin alterado com sucesso"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg:"Ocorreu um erro ao tentar modificar admin do userGroup"})
    }
}

const insertMember = async(req,res) =>{
    const idUserGroup = req.params.idUserGroup
    const {idUser,idRoutine} = req.body
    try{
        const isModifield = await userGroupModel.insertMember(idUser,idRoutine,idUserGroup)       
        if(isModifield){
            return res.status(200).json({msg:'Membro inserido com sucesso'})            
        }else{
            return res.status(200).json({msg:'Sem sucesso ao inserir o membro'})
        }
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
