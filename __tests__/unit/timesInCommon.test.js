const isContained = require('../../controller/Features/coinciding_times/isContained')
const partIsContained = require('../../controller/Features/coinciding_times/partIsContained')
const shortInterval = require('../../controller/Features/coinciding_times/shortInterval')
const intervalsOnCommun = require('../../controller/Features/coinciding_times/intervalsOnCommun');
const filterLabelIntervals = require('../../controller/Features/coinciding_times/filterLabelIntervals');
describe("TimesInCommon",()=>{
    it("shoud return smallest range",()=>{        
        const intervalArray = 
        [
            {initial:0, ending:20, label:"Running" },
            {initial:16, ending:60, label:"Buying Food"},
            {initial:70, ending:110, label:"Free Time"}
        ]
        expect(shortInterval(intervalArray)).toEqual({initial:0, ending:20, label:"Running" });
    });
    it("should return true if first interval contais the second interval",()=>{
        const firstInterval = {initial:0, ending:20, label:"Running" }
        const secondInterval = {initial:10, ending:15, label:"Breakfast" }
        const thirdInterval = {initial:0,ending:20, label:"Dinner"}
        const testContained = isContained(firstInterval,secondInterval)       
        expect(testContained).toBe(true);
    });
    it("shoud return true if at least one part of second array is contained in first array",()=>{
        const firstInterval = {initial:10, ending:30, label:"Running" }
        const secondInterval = {initial:25, ending:35, label:"Breakfast"}
        const thirdInterval = {initial:31,ending:40, label:"Dinner"}
        const forthInterval = {initial:0,ending:9, label:"Dinner"}
        const testPartContained = 
        partIsContained(firstInterval,secondInterval) && !partIsContained(firstInterval,thirdInterval) &&
        !partIsContained(firstInterval,forthInterval)
        expect(testPartContained).toBe(true);
    });
    it('must return object with ranges in common with a specified label',()=>{
        const routine = 
        [
            [
                {initial:0,ending:100,label:"acordar"},
                {initial:100,ending:200,label:"tomar café"},
                {initial:300,ending:400,label:"exercitar"},
                {initial:400,ending:900,label:"tempo livre"},
                {initial:900,ending:2000,label:"dormir"},
            ],
            [
                {initial:0,ending:70,label:"acordar"},
                {initial:70,ending:250,label:"tomar café"},
                {initial:250,ending:500,label:"exercitar"},
                {initial:400,ending:600,label:"tempo livre"},
                {initial:600,ending:1500,label:"exercitar"},
                {initial:1500,ending:2000,label:"dormir"},
            ],
            [
                {initial:0,ending:200,label:"acordar"},
                {initial:200,ending:1300,label:"tempo livre"},        
                {initial:1300,ending:1500,label:"exercitar"},
                {initial:1700,ending:2000,label:"dormir"}
            ]
        ] 
        const label = "Tempo livre"
        expect(intervalsOnCommun(routine,label).toEqual({initial:400,ending:600,label:"tempo livre"}))
    }) 
    it('should return all arrays filtered', ()=>{
        const tempoLivre = "tempo livre"
        const arraysTest =          
        [
            [
                {initial:0,ending:100,label:"acordar"},
                {initial:100,ending:200,label:"tomar café"},
                {initial:300,ending:400,label:"exercitar"},
                {initial:400,ending:900,label:"tempo livre"},
                {initial:900,ending:2000,label:"dormir"},
            ],
            [
                {initial:0,ending:70,label:"acordar"},
                {initial:70,ending:250,label:"tomar café"},
                {initial:250,ending:500,label:"exercitar"},
                {initial:400,ending:600,label:"tempo livre"},
                {initial:600,ending:1500,label:"exercitar"},
                {initial:1500,ending:2000,label:"dormir"},
            ],
            [
                {initial:0,ending:200,label:"acordar"},
                {initial:200,ending:1300,label:"tempo livre"},        
                {initial:1300,ending:1500,label:"exercitar"},
                {initial:1700,ending:2000,label:"dormir"}
            ]
        ]
        const expectedOutput =         
        [
            [             
                {initial:400,ending:900,label:"tempo livre"},                
            ],
            [                
                {initial:400,ending:600,label:"tempo livre"},                
            ],
            [                
                {initial:200,ending:1300,label:"tempo livre"},                 
            ]
        ]
        expect(filterLabelIntervals(arraysTest,tempoLivre)).toEqual(expectedOutput) 
    })  
    
});