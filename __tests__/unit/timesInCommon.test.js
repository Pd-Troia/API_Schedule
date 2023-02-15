const isContained = require('../../controller/Features/coinciding_times/isContained')
const partIsContained = require('../../controller/Features/coinciding_times/partIsContained')
const intervalsOnCommun = require('../../controller/Features/coinciding_times/intervalsOnCommun');
const filterLabelIntervals = require('../../controller/Features/coinciding_times/filterLabelIntervals');
const communInterval = require('../../controller/Features/coinciding_times/communInterval');
describe("TimesInCommon",()=>{    
    it("should return true if first interval contais the second interval",()=>{
        const firstInterval = {initial:0, ending:20, label:"Running" }
        const secondInterval = {initial:10, ending:15, label:"Breakfast" }
        const thirdInterval = {initial:0,ending:20, label:"Dinner"}
        const testContained = isContained(firstInterval,secondInterval)       
        expect(testContained).toBe(true);
    });
    it("shoud return 1 for initial part second interval and 2 por ending part of second interval",()=>{
        const firstInterval = {initial:10, ending:30, label:"Running" }
        const secondInterval = {initial:25, ending:35, label:"Breakfast"}
        const thirdInterval = {initial:5,ending:15, label:"Dinner"}
        const forthInterval = {initial:0,ending:9, label:"Dinner"}
        const testPartContained = partIsContained(firstInterval,thirdInterval)        
        expect(testPartContained).toBe(2);
    });
    it('must return object with ranges in common with a specified label',()=>{
        const routine = 
        [
            {intervals:
                [
                    {initial:0,ending:100,label:"acordar"},
                    {initial:100,ending:200,label:"tomar café"},
                    {initial:300,ending:400,label:"exercitar"},
                    {initial:400,ending:900,label:"tempo livre"},
                    {initial:900,ending:2000,label:"dormir"},
                ]
            },
            {intervals:
                [
                    {initial:0,ending:70,label:"acordar"},
                    {initial:70,ending:250,label:"tomar café"},
                    {initial:250,ending:500,label:"exercitar"},
                    {initial:400,ending:600,label:"tempo livre"},
                    {initial:600,ending:1500,label:"exercitar"},
                    {initial:1500,ending:2000,label:"dormir"},
                ]
            },
            {intervals:
                [
                    {initial:0,ending:200,label:"acordar"},
                    {initial:200,ending:1300,label:"tempo livre"},        
                    {initial:1300,ending:1500,label:"exercitar"},
                    {initial:1700,ending:2000,label:"dormir"}
                ]
            },
            {intervals:
                [
                    {initial:0,ending:70,label:"acordar"},
                    {initial:70,ending:250,label:"tomar café"},
                    {initial:250,ending:300,label:"exercitar"},
                    {initial:300,ending:550,label:"tempo livre"},
                    {initial:600,ending:1500,label:"exercitar"},
                    {initial:1500,ending:2000,label:"dormir"},
                ]
            }, 
            {intervals:
                [
                    {initial:0,ending:70,label:"acordar"},
                    {initial:70,ending:250,label:"tomar café"},
                    {initial:250,ending:500,label:"exercitar"},
                    {initial:500,ending:600,label:"tempo livre"},
                    {initial:600,ending:1500,label:"exercitar"},
                    {initial:1500,ending:2000,label:"dormir"},
                ]
            }                       
        ]
        const label = "tempo livre"
        expect(intervalsOnCommun(routine,label)).toEqual([{initial:500,ending:550,label:"tempo livre"}])
    }) 
    it('should return all arrays filtered by label', ()=>{
        const tempoLivre = "tempo livre"
        const multipleRoutines =          
        [
            {intervals:
            [
                {initial:0,ending:100,label:"acordar"},
                {initial:100,ending:200,label:"tomar café"},
                {initial:300,ending:400,label:"exercitar"},
                {initial:400,ending:900,label:"tempo livre"},
                {initial:900,ending:2000,label:"dormir"},
            ]
            },
            {intervals:
                [
                {initial:0,ending:70,label:"acordar"},
                {initial:70,ending:250,label:"tomar café"},
                {initial:250,ending:500,label:"exercitar"},
                {initial:400,ending:600,label:"tempo livre"},
                {initial:600,ending:1500,label:"exercitar"},
                {initial:1500,ending:2000,label:"dormir"},
                ]
            },
            {intervals:
                [
                {initial:0,ending:200,label:"acordar"},
                {initial:200,ending:1300,label:"tempo livre"},        
                {initial:1300,ending:1500,label:"exercitar"},
                {initial:1700,ending:2000,label:"dormir"}
                ]
            }
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
        expect(filterLabelIntervals(multipleRoutines,tempoLivre)).toEqual(expectedOutput) 
    })  
    it('should return a interval resulting from two array intervals in common',()=>{
        const interval1 = [{initial:5,ending:13,label:"tempo livre"},{initial:15,ending:19,label:"jurubeba"}]
        const interval2 = [{initial:10,ending:20,label:"tempo livre"}]
        const expected = 
        [
            {initial:10,ending:13,label:"tempo livre"}, 
            {initial:15,ending:19,label:"jurubeba"}           
        ] 
        expect(communInterval(interval1,interval2)).toEqual(expected)
    })
});