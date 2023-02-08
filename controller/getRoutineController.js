const Routine = require('../model/Routine')
const getRoutineController = async(req,res) =>{ 
    try{
        const routine = await Routine.find({idUser: req.params.idUser})        
        console.log(routine)
        return routine 
        ? res.status(200).json({routine: routine}) 
        : res.status(404).json({msg: " Não foi encontrada nenhuma rotina no usuário especificado"}) 
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}
module.exports = getRoutineController