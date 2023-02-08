const Routine = require('../model/Routine')
const createRoutineController = async(req,res) =>{
    const {idUser,intervals} = req.body       
    const routineModel = Routine({idUser,intervals})
    try{
        await routineModel.save()
        res.status(200).json({msg:"Rotina criada com sucesso"})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:"Ocorreu um erro no servidor"})
    }
}
module.exports = createRoutineController