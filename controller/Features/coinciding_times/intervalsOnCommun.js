const filterLabelIntervals = require("./filterLabelIntervals")
const finalCommunInterval = require("./finalCommunInterval")
const isContained = require("./isContained")
const partIsContained = require("./partIsContained")

//@params
//@param multiplesRoutines = [[{}]] SomePeoplesIntervals
//@param label to compair of multiple people
const intervalsOnCommun = (multipleRoutines,label)=>{  
    
    const filteredArray = filterLabelIntervals(multipleRoutines,label)    
    const firstRoutine = filteredArray.shift()
    intervalsFinal = []
    intervalsTemp = []
    firstRoutine.intervals.foreach((intervalFirstRoutine)=>{        
        intervalsTemp.push(intervalFirstRoutine)
        for(let i = 0;i<filteredArray.length;i++){ // runs for routines
            visitedRoutine = filteredArray[i]
            intervalsFounded = []
            for(let j = 0;j<visitedRoutine.length;j++){ // runs for intervals in routine
                visitedInterval = visitedInterval[j]
                // verify if one contains other                
                const contained=
                isContained(intervalFirstRoutine,visitedInterval) || isContained(visitedInterval,intervalFirstRoutine)
                if(contained){ 
                    intervalsFounded.push(visitedInterval)       
                }
                if(!contained){
                    //verify if part of one contais other
                    const partContained = partIsContained(intervalFirstRoutine,visitedInterval)
                    if(partContained !== 0){
                        intervalsFounded.push(visitedInterval)
                    }
                }
            }            
            if(intervalsFounded.length > 0){
                intervalsTemp.push(intervalsFounded)
            }
        }
        // process intervals on common
        if(intervalsTemp.length === filteredArray+1 ){
            intervalFinal.push(finalCommunInterval(intervalsTemp))
        }
    })
    return intervalFinal
}
module.exports = intervalsOnCommun