const Routine = require('../../../model/Routine')
const intervalsOnCommun = require('./intervalsOnCommun')
const getCoincidingTimesController = async (req,res) =>{    
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId.split("&")       
    const query = await Routine.find({
        _id
    })    
    res.status(200).json(intervalsOnCommun(query,"tempo livre")) 
    
}
module.exports = getCoincidingTimesController