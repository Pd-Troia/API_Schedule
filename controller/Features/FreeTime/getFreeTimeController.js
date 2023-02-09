const generateFreeTime = require('./generateFreeTime')
const Routine = require('../../../model/Routine')
const getFreeTimeController = async(req,res) => {    
    const idRoutine = req.params.idRoutine
    if(!idRoutine){return res.status(404).json({msg:'idRoutine não enviado'})}
    const  routine = await Routine.findById(idRoutine)    
    if(!idRoutine){return res.status(404).json({msg:'Rotina não encontrada'})}
    routine.intervals = generateFreeTime(routine.intervals)
    return res.status(200).json({msg:"Tempos livres adicionados", routine})
}
module.exports = getFreeTimeController

