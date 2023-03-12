const dayInMilisseconds = 86400000

// return true if the next interval not have part inside of actual interval
const ilegalPartIntervals = (actualInterval,nextInterval) =>{
    const partIsContainedModifield = (firstInterval,secondInterval)=>{
        const verifyInicial = 
        firstInterval.initial < secondInterval.initial && firstInterval.ending > secondInterval.initial
        const verifyEnding = 
        firstInterval.initial < secondInterval.ending && firstInterval.ending > secondInterval.ending
        if(verifyInicial){return 1}
        if(verifyEnding){return 2}
        return 0
    }
    const numberResponse = partIsContainedModifield(actualInterval,nextInterval)
    return !(numberResponse != 0)   //remake this
}
// return true if intervals is in bounded in timestamp ms of one day 
const boundedIntervals = (actualInterval,nextInterval) =>{
    const firstTest = actualInterval.initial >= 0 && actualInterval.ending <= dayInMilisseconds
    const secondTest = nextInterval.initial >= 0 && nextInterval.ending <= dayInMilisseconds
    return firstTest && secondTest
}
// return true if the actual interval has values less than next
const IntervalsTimeStraight = (actualInterval,nextInterval)=>{
    const test1 = actualInterval.initial <= nextInterval.initial 
    const test2 = actualInterval.ending <= nextInterval.ending
    return test1 && test2 
}

// iterates the intervals seeking for errors in conditions and return the errors ou false if not has erros
const verifyConditions = (intervals)=>{
    const errors = []
    if(intervals.length <= 1){errors.push("Apenas um ou nenhum intervalo foi fornecido")}    
    for(let i=0;i<intervals.length-1;i++){
        if(!IntervalsTimeStraight(intervals[i],intervals[i+1])){
            errors.push(`O intervalo ${i+1} ocorre antes do intervalo ${i}`)
        }
        if(!ilegalPartIntervals(intervals[i],intervals[i+1])){
            errors.push(`O intervalo ${i+1} esta contido em parte no intervalo ${i}`)
        }
        if(!boundedIntervals(intervals[i],intervals[i+1])){
            errors.push(`O intervalo ${i+1} possui algum valor menor que o intervalo ${i}`)
        }        
    }
    return errors   
}
const notFoundRoutine = (listIdRoutines, routines) =>{
    const routinesNotFounded = []     
    for(let i = 0;i<listIdRoutines.length;i++){
        let founded = false 
        for(let j = 0;j<routines.length;j++){            
            let firstElement = listIdRoutines[i]            
            let secondElement = routines[j]._id.toString()
            if(firstElement === secondElement){
                founded = true
            }
        }
        if(!founded){
            routinesNotFounded.push(listIdRoutines[i])
        }
    }
    return routinesNotFounded
}

module.exports = {
    verifyConditions,
    notFoundRoutine
}