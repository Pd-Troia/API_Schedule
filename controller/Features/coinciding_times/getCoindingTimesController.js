const Routine = require('../../../model/Routine')
const getCoincidingTimesController = (req,res) =>{    
    const multipleRoutinesId = req.params.idsRoutine
    const _id = multipleRoutinesId   
    const query = Routine.findById({_id})
    console.log(query)
    res.status(200).json({msg:'200 ok'})
    
}
module.exports = getCoincidingTimesController