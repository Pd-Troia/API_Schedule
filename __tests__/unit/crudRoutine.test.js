const generateFreeTime = require('../../controller/Features/free_time/generateFreeTime')
describe("Unit tests for routine CRUD",()=>{
    it("Must return an array filled a 'tempos livres' on free time",()=>{
        const routine =
        {
			"_id": "63e3affda39984e73a434e62",
			"idUser": 1,
			"intervals": [
				{
					"initial": 0,
					"ending": 10,
					"label": "acordando",					
				},
				{
					"initial": 10,
					"ending": 20,
					"label": "tomando café",					
				},
                {
					"initial": 40,
					"ending": 50,
					"label": "drinking with friends",					
				}
			],
			"__v": 0
		}        
        const expectRoutine = 
        [
        {
            "initial": 0,
            "ending": 10,
            "label": "acordando",
            
        },
        {
            "initial": 10,
            "ending": 20,
            "label": "tomando café",
            
        },
        {
            "initial": 20,
            "ending": 40,
            "label": "tempo livre",					
        },
        {
            "initial": 40,
            "ending": 50,
            "label": "drinking with friends",					
        },
        {
            "initial": 50,
            "ending": 86400000,
            "label": "tempo livre",					
        }
        ]              
        expect(generateFreeTime(routine.intervals)).toEqual(expectRoutine)
    })
})