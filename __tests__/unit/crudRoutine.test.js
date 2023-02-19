const generateFreeTime = require('../../service/generate_free_time/generateFreeTime')
describe("Unit tests for routine CRUD",()=>{
    it("Must return an array filled a 'tempos livres' on free time",()=>{
        const routine =
        {
			"_id": "63e3affda39984e73a434e62",
			"idUser": 1,
			"intervals": [
                {
                    "initial": 0,
                    "ending": 30,
                    "label": "bebendo"
                },
                {
                    "initial":50,
                    "ending": 130,
                    "label": "fumadno"
                },
                {
                    "initial": 130,
                    "ending": 150000,
                    "label": "birigando"
                }
            ],
			"__v": 0
		}        
        const expectRoutine = 
        [
            {
                "initial": 0,
                "ending": 30,
                "label": "bebendo"
            },
            {
                "initial":30,
                "ending": 50,
                "label": "tempo livre"
            },            
            {
                "initial":50,
                "ending": 130,
                "label": "fumadno"
            },
            {
                "initial": 130,
                "ending": 150000,
                "label": "birigando"
            },
            {
                "initial": 150000,
                "ending": 86400000,
                "label": "tempo livre"
            }
        ]              
        expect(generateFreeTime(routine.intervals)).toEqual(expectRoutine)
    })
})