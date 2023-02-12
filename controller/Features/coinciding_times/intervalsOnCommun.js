const filterLabelIntervals = require("./filterLabelIntervals")
const isContained = require("./isContained")

//@params
//@param multiplesRoutines = [[{}]] SomePeoplesIntervals
//@param label to compair of multiple people
const intervalsOnCommun = (multipleRoutines,label)=>{  
    
    const filteredArray = filterLabelIntervals(multipleRoutines,label)
    const firstRoutine = filteredArray.shift()
    intervalsFinal = []
    intervalsTemp = []
    firstRoutine.foreach((intervalFirstRoutine)=>{
        intervalsTemp.push(intervalFirstRoutine)
        for(let i = 0;i<filteredArray.length;i++){
            visitedRoutine = filteredArray[i]
            for(let j = 0;j<visitedRoutine.length;j++){
                visitedInterval = visitedInterval[j]
                if(isContained(intervalFirstRoutine,visitedInterval)
                ||isContained(visitedInterval,intervalFirstRoutine)){ // verify if one array contains other
                    if(!(intervalsTemp[i] == undefined)){ // verify if position exists
                        intervalsTemp.push(visitedInterval)
                    }else{
                        if(visitedInterval.final-visitedInterval.initial <
                        intervalsTemp[i].final-intervalsTemp[i].initial){
                            intervalsTemp[i] = visitedInterval
                        }
                    }
                    
                }
            }
        }
    })
}
module.exports = intervalsOnCommun