const userGroupValidator = require("../services/validations/userGroupValidator")
//messages
//payload
const vPUsermsg = "Id User não foi enviado"
const vPRoutineMsg = "Id Routine não foi enviado"
const vPUserGroupMsg = "Id User Group não foi enviado"
//ObjectID
const vOUserMsg = "O Id User enviado não é válido"
const vORoutineMsg = "O Id User enviado não é válido"
const vOUserGroupMsg = "O Id User Group enviado não é válido"
//Exists
const vEUserMsg = "O id do usuário não existe no sistema"
const vERoutineMsg = "O id da Rotina não existe no sistema"
const vEUserGroupMsg = "O id do grupo de usuários não existe no sistema"
//validadte responses
const validateCreateUserGroup = async(req,res,next) => {
    const {idUser,idRoutine} = req.body
    if(userGroupValidator.vPayload(res,idUser,vPUsermsg)){return}
    if(userGroupValidator.vPayload(res,idRoutine,vPRoutineMsg)){return}    
    if(userGroupValidator.vObjectId(res,idUser,vOUserMsg)){return}
    if(userGroupValidator.vObjectId(res,idRoutine,vORoutineMsg)){return}   
    if(await userGroupValidator.vUserExists(res,idUser,vEUserMsg)){return}
    if(await userGroupValidator.vRoutineExists(res,idRoutine,vERoutineMsg)){return}   
    next()
} 

const validateGetUserGroup = async(req,res,next) => {
    const idUser = req.params.idUser
    if(userGroupValidator.vPayload(res,idUser,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,idUser,vOUserGroupMsg)){return}
    if(await userGroupValidator.vUserExists(res,idUser,vEUserGroupMsg)){return}
    next()
} 

const validateDeleteUserGroup = async(req,res,next) => {
    const idUserGroup = req.params.idUserGroup
    if(userGroupValidator.vPayload(res,idUserGroup,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,idUserGroup,vOUserGroupMsg)){return}
    if(await userGroupValidator.vUserGroupExists(res,idUserGroup,vEUserGroupMsg)){return}
    next()
}
const validateUpdateAdminUserGroup = async(req,res,next) => {
    const idUserGroup = req.params.idUserGroup
    const {newIdAdmin} = req.body
    if(userGroupValidator.vPayload(res,idUserGroup,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,idUserGroup,vOUserGroupMsg)){return}
    if(userGroupValidator.vPayload(res,newIdAdmin,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,newIdAdmin,vOUserGroupMsg)){return} 
    if(await userGroupValidator.vUserExists(res,newIdAdmin,vEUserMsg)){return}    
    if(await userGroupValidator.vUserGroupExists(res,idUserGroup,vEUserGroupMsg)){return}
    next()
}
const validateInsertMember = async(req,res,next)=>{
    const idUserGroup = req.params.idUserGroup
    const {idUser,idRoutine} = req.body
    if(userGroupValidator.vPayload(res,idUserGroup,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,idUserGroup,vOUserGroupMsg)){return}
    if(userGroupValidator.vPayload(res,idUser,vPUsermsg)){return}
    if(userGroupValidator.vObjectId(res,idUser,vOUserMsg)){return} 
    if(userGroupValidator.vPayload(res,idRoutine,vPRoutineMsg)){return} 
    if(userGroupValidator.vObjectId(res,idRoutine,vORoutineMsg)){return} 
    if(await userGroupValidator.vUserExists(res,idUser,vEUserMsg)){return}    
    if(await userGroupValidator.vUserGroupExists(res,idUserGroup,vEUserGroupMsg)){return}
    if(await userGroupValidator.vRoutineExists(res,idRoutine,vERoutineMsg)){return}   
    next()
}
const validateDeleteMember = async(req,res,next)=>{
    const idUserGroup = req.params.idUserGroup
    const {idUser} = req.body
    if(userGroupValidator.vPayload(res,idUserGroup,vPUserGroupMsg)){return}
    if(userGroupValidator.vObjectId(res,idUserGroup,vOUserGroupMsg)){return}
    if(userGroupValidator.vPayload(res,idUser,vPUsermsg)){return}
    if(userGroupValidator.vObjectId(res,idUser,vOUserMsg)){return}     
    if(await userGroupValidator.vUserExists(res,idUser,vEUserMsg)){return}    
    if(await userGroupValidator.vUserGroupExists(res,idUserGroup,vEUserGroupMsg)){return}    
    next()
}

module.exports = {
    validateCreateUserGroup,
    validateUpdateAdminUserGroup,
    validateGetUserGroup,
    validateDeleteUserGroup,
    validateInsertMember,
    validateDeleteMember,
}