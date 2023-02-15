const communInterval = require("./communInterval");
// return a commun interval of all arrays
const finalCommunInterval = (array)=>{    
    let finalInterval = communInterval(array[0],array[1])    
    for(let i=0; i<array.length-2;i++){
        finalInterval = communInterval(finalInterval,array[i+2])
    }  
    return finalInterval
}
module.exports = finalCommunInterval;