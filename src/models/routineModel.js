const mongoose = require('mongoose')
const schema = mongoose.Schema({
    idUser: {type: mongoose.Types.ObjectId, ref: "User"},
    intervals: [{initial: Number, ending: Number, label: String}]
})
const Routine = mongoose.model("Routine", schema )

const updateRoutineIntervals = async (id,intervals)=>{
    try{
    const routine = await Routine.findById(id)   
    routine.intervals = intervals
    await routine.save()
    return routine    
    }catch(err){
        console.log(err)
        throw new Error('Error to update routine')
    }
}
const createRoutine = async (idUser,intervals) =>{
    try{        
        const routine = await Routine({idUser,intervals})
        await routine.save()
        return routine
    }catch(err){
        console.log(err)
        throw new Error('Error to create routine')
    }
}
const deleteRoutine = async(idRoutine) =>{
    try{        
        const deletedRoutine = await Routine.deleteOne({_id:idRoutine})
        return deletedRoutine        
    }catch(err){
        console.log(err)
        throw new Error('Error to delete a routine')
    }
}
const getRoutine = async (idUser)=>{
    try{
        const routine = await Routine.find({idUser})
        return await routine
    }catch(err){
        console.log(err)
        throw new Error('Error to get routine by Id User')
    }
}
const getRoutineByIdRoutine = async (idRoutine)=>{
    try{     
        const routine = await Routine.find({_id:idRoutine})     
        return routine 
    }catch(err){
        console.log(err)
        throw new Error('Error to get routine by Id Routine')
    }
}
module.exports = 
    {
    updateRoutineIntervals,
    createRoutine,
    deleteRoutine,
    getRoutine,
    getRoutineByIdRoutine
}