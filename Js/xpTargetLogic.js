function getXPForLevel(level) {

    if (!Number.isInteger(level) || level < 1 || level > 99) {
        return null;
    }

    let totalXP = 0;

    for (let i = 1; i < level; i++) {
        totalXP += Math.floor(i + 300 * Math.pow(2, i / 7));
    }

    return Math.floor(totalXP / 4);

}


function calculateXPToTarget(currentXP, targetLevel) {

    if (!Number.isInteger(currentXP) || currentXP < 0) {
        return null;
    }

    let targetXP = getXPForLevel(targetLevel);

    if (targetXP === null) {
        return null;
    }

    return Math.max(0, targetXP - currentXP);

}


if (typeof module !== "undefined") {
    module.exports = { getXPForLevel, calculateXPToTarget };
}