const Routine = require('../model/Routine')
const getRoutineController = async(req,res) =>{ 
    const routine = await Routine.findOne({idUser: req.params.idUser})
    console.log(routine)
    return routine 
    ? res.status(200).json({intervals: routine.intervals}) 
    : res.status(404).json({msg: " Não foi encontrada nenhuma rotina no usuário especificado"}) 
}
module.exports = getRoutineController