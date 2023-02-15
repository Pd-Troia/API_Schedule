const Routine = require('../../model/Routine')
const generateFreeTime = require('../Features/free_time/generateFreeTime')
const createRoutineController = async(req,res) =>{
    const {idUser,intervals} = req.body       
    const intervalsWithSpace = generateFreeTime(intervals)
    const routineModel = Routine({idUser,intervalsWithSpace})
    try{
        await routineModel.save()
        res.status(200).json({msg:"Rotina criada com sucesso"})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:"Ocorreu um erro no servidor"})
    }
}
module.exports = createRoutineController