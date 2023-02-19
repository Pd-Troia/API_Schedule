const partIsContained = require("../coindicent_times/partIsContained")
const dayInMilisseconds = 86400000
// return true if the next interval not have part inside of actual interval
const ilegalPartIntervals = (actualInterval,nextInterval) =>{
    const numberResponse = partIsContained(actualInterval,nextInterval)
    if(numberResponse != 0){
        return false
    }
    return true
}
// return true if intervals is in bounded
const Boundedintervals = (actualInterval,nextInterval) =>{
    const firstTest = actualInterval.initial > 0 && actualInterval.ending < dayInMilisseconds
    const secondTest = nextInterval.initial > 0 && nextInterval.ending < dayInMilisseconds
    return firstTest && secondTest
}
// return false if the next interval has values greather than actual interval
const IntervalsTimeStraight = (actualInterval,nextInterval)=>{
   return(
    actualInterval.inital <= nextInterval.iniital && actualInterval.ending <= nextInterval.ending  
   )
}

