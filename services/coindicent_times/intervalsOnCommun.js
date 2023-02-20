const filterLabelIntervals = require("./filterLabelIntervals")
const finalCommunInterval = require("./finalCommunInterval")
const isContained = require("./isContained")
const partIsContained = require("./partIsContained")

//@params
//@param multiplesRoutines = [[{}]] SomePeoplesIntervals
//@param label to compair of multiple people
// returns an array of intervalsOnCommun with same label
const intervalsOnCommun = (multipleRoutines,label)=>{  
    
    const filteredArray = filterLabelIntervals(multipleRoutines,label)    
    const firstRoutine = filteredArray.shift()
    const intervalsFinal = []
    const intervalsTemp = []    
    for(let iFirst=0;iFirst<firstRoutine.length;iFirst++){    
        intervalFirstRoutine = firstRoutine[iFirst]
        const correctPush = !(intervalFirstRoutine instanceof Array)?[intervalFirstRoutine]:intervalFirstRoutine
        intervalsTemp.push(correctPush)
        for(let i = 0;i<filteredArray.length;i++){ // runs for routines
            visitedRoutine = filteredArray[i]
            const intervalsFounded = []
            for(let j = 0;j<visitedRoutine.length;j++){ // runs for intervals in routine
                let visitedInterval = visitedRoutine[j]
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
        if(intervalsTemp.length === filteredArray.length+1 ){
            const finalIntervals = finalCommunInterval(intervalsTemp)
            for(let iFinal=0;iFinal<finalIntervals.length;iFinal++){
                intervalsFinal.push(finalIntervals[iFinal])
            }
        }
    }
    return intervalsFinal
}
module.exports = intervalsOnCommun