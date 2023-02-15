const Routine = require('../../model/Routine')
const deleteRoutine = async(req,res)=>{    
    try{
        if(!req.params.idRoutine){ 
            return res.status(404).json({msg:'Id não informado ou não encontrado'})
        }        
        const query = await Routine.findByIdAndRemove({_id: req.params.idRoutine})        
        return  query 
        ? res.status(200).json({msg:'Rotina removida com sucesso'})
        : res.status(404).json({msg:'Rotina não encontrada'})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}
module.exports = deleteRoutine