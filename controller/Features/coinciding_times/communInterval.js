const isContained = require("./isContained");
const partIsContained = require("./partIsContained");

const communInterval = (firstIntervalArray,secondIntervalArray)=>{    
    const output = []      
    let contained = false
    firstIntervalArray.forEach(firstInterval => {
        secondIntervalArray.forEach(secondInterval => {
            if(isContained(firstInterval,secondInterval)){
                output.push(secondInterval)
                contained = true;
            }
            if(isContained(secondInterval,firstInterval)){
                output.push(firstInterval)
                    contained = true                
            }            
            const partContained = partIsContained(firstInterval,secondInterval)
            if(!contained){
                if(partContained == 1 ){
                    const newInterval = 
                    {
                        initial:secondInterval.initial,
                        ending:firstInterval.ending,
                        label:firstInterval.label
                    }
                    output.push(newInterval)
                }else if(partContained == 2 ){
                    const newInterval = 
                    {
                        initial:firstInterval.initial,
                        ending:secondInterval.ending,
                        label:firstInterval.label
                    }
                    output.push(newInterval)
                }         
            }        
        });
    });      
    return output  
}
module.exports = communInterval;