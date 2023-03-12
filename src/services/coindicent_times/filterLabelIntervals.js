const filterLabelIntervals = (multipleRoutines, label)=>{
    for(i=0;i<multipleRoutines.length;i++){
        multipleRoutines[i] = multipleRoutines[i].intervals.filter((interval)=>interval.label == label)
    }
    return multipleRoutines
}
module.exports = filterLabelIntervals