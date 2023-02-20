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
// return true if intervals is in bounded
const boundedIntervals = (actualInterval,nextInterval) =>{
    const firstTest = actualInterval.initial >= 0 && actualInterval.ending <= dayInMilisseconds
    const secondTest = nextInterval.initial >= 0 && nextInterval.ending <= dayInMilisseconds
    return firstTest && secondTest
}
// return false if the next interval has values greather than actual interval
const IntervalsTimeStraight = (actualInterval,nextInterval)=>{
    const test1 = actualInterval.initial <= nextInterval.initial 
    const test2 = actualInterval.ending <= nextInterval.ending
    return test1 && test2 
}

module.exports = {
    ilegalPartIntervals,
    boundedIntervals,
    IntervalsTimeStraight
}