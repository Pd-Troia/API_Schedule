// @Params 
// firstInterval = [initial,ending]
// secondInterval =  [initial,ending]
// return true if first interval contains second interval

const isContained = (firstInterval,secondInterval)=>{    
    return (firstInterval.initial <= secondInterval.initial && firstInterval.ending >= secondInterval.ending)   
}
module.exports = isContained;