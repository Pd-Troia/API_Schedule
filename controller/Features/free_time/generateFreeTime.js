const generateFreeTime = (intervals) => {    
    const auxInterval = intervals.slice()
    for(let i=0;i<intervals.length-1;i++){
        const interval = intervals[i]        
        const nextInterval = intervals[i+1]        
        const lastIterator = intervals.length-2
        if(interval.ending != nextInterval.initial){            
            const newInterval = {
                initial: interval.ending,
                ending: nextInterval.initial,
                label:"tempo livre"
            }
            auxInterval.splice(i+1, 0, newInterval)
        }
        const oneDayInMiliSeconds = 86400000
        if(i === lastIterator && nextInterval.ending < oneDayInMiliSeconds){            
            const newInterval = {
                initial: nextInterval.ending,
                ending: oneDayInMiliSeconds,
                label:"tempo livre"
            }
            auxInterval.push(newInterval)
        }
    }
    
    return auxInterval
}
module.exports = generateFreeTime
