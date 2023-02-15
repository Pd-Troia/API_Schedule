const isContained = require("./isContained");
const partIsContained = require("./partIsContained");
// return a commum interval of 2 intervals
const communInterval = (firstIntervalArray,secondIntervalArray)=>{    
    const output = []      
    let contained = false    
    for(let i=0;i<firstIntervalArray.length;i++){
        const firstInterval = firstIntervalArray[i]
        for(let j=0;j<secondIntervalArray.length;j++) {
            const secondInterval = secondIntervalArray[j]
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
        };
    };      
    return output  
}
module.exports = communInterval;