const routineValidator = require('../../service/validations/routineValidator')
describe("Validation tests",()=>{
    it("must return false if actual interval of same routine contains inital part of next interval",()=>{
        const actualInterval = {initial:0,ending:20,label:"tempo livre"}
        const nextInterval = {initial:20,ending:30,label:"tempo livre"}
        expect(routineValidator.ilegalPartIntervals(actualInterval,nextInterval)).toBe(true)  
    })
    it("must return false if test routine has times out of interval 0 and 24h in miliseconds ",()=>{
        const actualInterval = {initial:0,ending:20,label:"tempo livre"}
        const nextInterval = {initial:20,ending:70000,label:"tempo livre"}
        expect(routineValidator.boundedIntervals(actualInterval,nextInterval)).toBe(true) 
         
    })
    it("must return false test if a next interval has values greather than actual interval",()=>{
        const actualInterval = {initial:0,ending:10,label:"tempo livre"}
        const nextInterval = {initial:11,ending:20,label:"tempo livre"}
        expect(routineValidator.IntervalsTimeStraight(actualInterval,nextInterval)).toBe(true)         
    })
})