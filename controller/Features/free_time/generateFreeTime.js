const generateFreeTime = (intervals) => {    
    const auxInterval = intervals.slice()
    for(i=0;i<intervals.length-1;i++){
        const interval = intervals[i]        
        const nextInterval = intervals[i+1]        
        if(interval.ending != nextInterval.initial){            
            const newInterval = {
                initial: interval.ending,
                ending: nextInterval.initial,
                label:"Tempo Livre"
            }
            auxInterval.splice(i+1, 0, newInterval)
        }
    }
    
    return auxInterval
}
module.exports = generateFreeTime
