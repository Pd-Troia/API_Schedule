const communInterval = require("./communInterval");

const finalCommunInterval = (array)=>{    
    let finalInterval = communInterval(array[0],array[1])
    for(i=0; i<array.lenght-1;i++){
        finalInterval = communInterval(finalCommunInterval,array[i+2])
    }  
    return finalInterval
}
module.exports = finalCommunInterval;