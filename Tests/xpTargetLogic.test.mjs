import { test, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getXPForLevel, calculateXPToTarget } = require("../Js/xpTargetLogic.js");


test("Calculate XP needed to reach level 3", function() {

    let result = calculateXPToTarget(83, 3);

    expect(result).toBe(91);

});


test("Calculate XP needed for a higher target level", function() {

    let result = calculateXPToTarget(83, 10);

    expect(result).toBe(1071);

});


test("Return zero when the target is already reached", function() {

    let result = calculateXPToTarget(83, 2);

    expect(result).toBe(0);

});


test("Reject negative XP values", function() {

    let result = calculateXPToTarget(-50, 10);

    expect(result).toBe(null);

});


test("Reject target levels above 99", function() {

    let result = calculateXPToTarget(83, 100);

    expect(result).toBe(null);

});


test("Reject decimal XP and target levels", function() {

    expect(calculateXPToTarget(83.5, 10)).toBe(null);
    expect(calculateXPToTarget(83, 10.5)).toBe(null);

});


test("Calculate the XP requirement for level 99", function() {

    let result = getXPForLevel(99);

    expect(result).toBe(13034431);

});