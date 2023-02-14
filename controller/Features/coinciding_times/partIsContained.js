// @Params 
// firstInterval = [intialNumber]
// secondInterval =  [endingNumber]
// return 1 if the second interval initial has contained in first interval
// return 2 if the second interval ending has contained in first interval
//return 0 if the second interval initial, ending has no contained in the first interval
const partIsContained = (firstInterval,secondInterval)=>{
    const verifyInicial = 
    firstInterval.initial <= secondInterval.initial && firstInterval.ending >= secondInterval.initial
    const verifyEnding = 
    firstInterval.initial <= secondInterval.ending && firstInterval.ending >= secondInterval.ending
    if(verifyInicial){return 1}
    if(verifyEnding){return 2}
    return 0
}
module.exports = partIsContained;