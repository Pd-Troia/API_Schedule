const Routine = require('../model/Routine')
const updateRoutine = async(req,res)=>{
    const {intervals} = req.body
    if(!req.params.idRoutine){return res.status(404).json('Parametro não informado')}
    try{
        const query = await Routine.findByIdAndUpdate({_id: req.params.idRoutine},{intervals: intervals})
        return  query 
        ? res.status(200).json({msg:'Rotina atualizada com sucesso'})
        : res.status(404).json({msg:'Rotina não encontrada'})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}
module.exports = updateRoutine