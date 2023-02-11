const isContained = require('../../controller/Features/coinciding_times/isContained')
const partIsContained = require('../../controller/Features/coinciding_times/partIsContained')
const shortInterval = require('../../controller/Features/coinciding_times/shortInterval')
describe("TimesInCommon",()=>{
    it("shoud return smallest range",()=>{        
        const intervalArray = 
        [
            {intial:0, ending:20, label:"Running" },
            {intial:16, ending:60, label:"Buying Food"},
            {intial:70, ending:110, label:"Free Time"}
        ]
        expect(shortInterval(intervalArray)).toEqual({intial:0, ending:20, label:"Running" });
    });
    it("should return true if first interval contais the second interval",()=>{
        const firstInterval = {intial:0, ending:20, label:"Running" }
        const secondInterval = {intial:10, ending:15, label:"Breakfast" }
        const thirdInterval = {initial:0,ending:20, label:"Dinner"}
        const testContained = isContained(firstInterval,secondInterval) && isContained(firstInterval,thirdInterval)       
        expect(testContained).toBe(true);
    });
    it("shoud return true if at least one part of second array is contained in first array",()=>{
        const firstInterval = {intial:10, ending:30, label:"Running" }
        const secondInterval = {intial:25, ending:35, label:"Breakfast"}
        const thirdInterval = {initial:31,ending:40, label:"Dinner"}
        const forthInterval = {initial:0,ending:9, label:"Dinner"}
        const testPartContained = 
        partIsContained(firstInterval,secondInterval) && !partIsContained(firstInterval,thirdInterval) &&
        !partIsContained(firstInterval,forthInterval)
        expect(testPartContained).toBe(true);
    });
});