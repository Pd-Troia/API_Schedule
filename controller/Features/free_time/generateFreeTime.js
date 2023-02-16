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
        if(i === lastIterator && nextInterval.ending < 86400000){            
            const newInterval = {
                initial: nextInterval.ending,
                ending: 86400000,
                label:"tempo livre"
            }
            auxInterval.push(newInterval)
        }
    }
    
    return auxInterval
}
module.exports = generateFreeTime
