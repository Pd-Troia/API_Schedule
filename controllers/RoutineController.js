const routineModel = require('../models/routineModel')
const generateFreeTime = require('../service/generate_free_time/generateFreeTime')
const intervalsOnCommun = require('../service/coindicent_times/intervalsOnCommun')

const createRoutine = async(req,res) =>{
    const {idUser,intervals} = req.body  
    const newInterval = generateFreeTime(intervals)      
    try{
        await routineModel.createRoutine(idUser,newInterval)
        res.status(200).json({msg:"Rotina criada com sucesso"})
    }catch(err){
        console.log(err)
        res.status(422).json({msg:"Ocorreu um erro no servidor"})
    }
}

const getRoutine = async(req,res) =>{ 
    try{
        const routine = await routineModel.getRoutine(req.params.idUser)          
        if(routine){
        res.status(200).json({routine}) 
        }else{
        res.status(404).json({msg: " Não foi encontrada nenhuma rotina no usuário especificado"}) 
        }
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}

const updateRoutine = async(req,res)=>{
    const {intervals} = req.body    
    try{        
        const idRoutine = req.params.idRoutine 
        const query = await routineModel.updateRoutineIntervals(idRoutine,generateFreeTime(intervals))
        if(query){ 
            res.status(200).json({msg:'Rotina atualizada com sucesso'})
        }else{
            res.status(404).json({msg:'Rotina não encontrada'})
        }
    }catch(err){
        console.log(err)
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    }
}
const deleteRoutine = async(req,res)=>{    
    try{               
        const query = routineModel.deleteRoutine(req.params.idRoutine)      
        if(query){
            res.status(200).json({msg:'Rotina removida com sucesso'})
        }else{
            res.status(404).json({msg:'Rotina não encontrada'})
        }
    }catch(err){
        console.log(err) 
        res.status(422).json({msg:'Ocorreu um erro no servidor'})
    } 
}

const getCoincidingTimes = async (req,res) =>{    
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId.split("&")       
    const query = await routineModel.getRoutineByIdRoutine(_id)  
    res.status(200).json(intervalsOnCommun(query,"tempo livre"))     
}
module.exports = {createRoutine,getRoutine,updateRoutine,deleteRoutine,getCoincidingTimes}