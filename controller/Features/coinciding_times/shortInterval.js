// @Params 
// arrayIntervals = []
// return the smallest size range
const shortInterval = (arrayIntervals)=>{
    return arrayIntervals.sort((a,b)=>{
        return a.ending -a.initial < b.ending - b.initial
    })[0]
}
module.exports = shortInterval;