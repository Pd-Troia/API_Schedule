// @Params 
// firstInterval = [intialNumber]
// secondInterval =  [endingNumber]
// return true if first at least contains one part of second
const partIsContained = (firstInterval,secondInterval)=>{
    const verifySecondInicial = 
    firstInterval.initial <= secondInterval.initial && firstInterval.ending >= secondInterval.initial
    const verifySecondEnding = 
    firstInterval.initial <= secondInterval.ending && firstInterval.ending >= secondInterval.ending
    return (verifySecondInicial || verifySecondEnding) 
}
module.exports = partIsContained;