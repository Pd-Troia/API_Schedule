const Routine = require('../model/Routine')
const generateFreeTime = require('../service/generate_free_time/generateFreeTime')
const intervalsOnCommun = require('../service/coindicent_times/intervalsOnCommun')
const createRoutine = async(req,res) =>{
    const {idUser,intervals} = req.body    
    const routineModel = Routine({idUser,intervals:generateFreeTime(intervals)})
    try{
        await routineModel.save()
        res.status(200).json({msg:"Rotina criada com sucesso"})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:"Ocorreu um erro no servidor"})
    }
}

const getRoutine = async(req,res) =>{ 
    try{
        const routine = await Routine.find({idUser: req.params.idUser})          
        return routine 
            ? res.status(200).json({routine: routine}) 
            : res.status(404).json({msg: " Não foi encontrada nenhuma rotina no usuário especificado"}) 
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}

const updateRoutine = async(req,res)=>{
    const {intervals} = req.body
    if(!req.params.idRoutine){return res.status(404).json('Parametro não informado')}
    try{        
        const query = await Routine.findByIdAndUpdate({_id: req.params.idRoutine},{intervals: generateFreeTime(intervals)})
        return  query 
        ? res.status(200).json({msg:'Rotina atualizada com sucesso'})
        : res.status(404).json({msg:'Rotina não encontrada'})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}
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

const getCoincidingTimes = async (req,res) =>{    
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId.split("&")       
    const query = await Routine.find({
        _id
    })     
    res.status(200).json(intervalsOnCommun(query,"tempo livre"))     
}
module.exports = {createRoutine,getRoutine,updateRoutine,deleteRoutine,getCoincidingTimes}