import { test, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { sortSkillData } = require("../Js/sortLogic.js");


let testSkills = [
    { name: "mining", level: 20, position: 2 },
    { name: "strength", level: 75, position: 3 },
    { name: "attack", level: 50, position: 0 }
];


test("Sort skills from lowest to highest", function() {

    let result = sortSkillData(testSkills, "lowest");

    expect(result.map(skill => skill.name)).toEqual([
        "mining", "attack", "strength"
    ]);

});


test("Sort skills from highest to lowest", function() {

    let result = sortSkillData(testSkills, "highest");

    expect(result.map(skill => skill.name)).toEqual([
        "strength", "attack", "mining"
    ]);

});


test("Restore default skill order", function() {

    let result = sortSkillData(testSkills, "default");

    expect(result.map(skill => skill.name)).toEqual([
        "attack", "mining", "strength"
    ]);

});


test("Handle an unknown sorting option", function() {

    let result = sortSkillData(testSkills, "invalid");

    expect(result).toEqual(testSkills);

});


test("Keep the original skill data unchanged", function() {

    sortSkillData(testSkills, "highest");

    expect(testSkills[0].name).toBe("mining");

});