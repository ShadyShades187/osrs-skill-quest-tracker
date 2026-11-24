let sortMethods = {

    default: function(first, second) {
        return first.position - second.position;
    },

    lowest: function(first, second) {
        return first.level - second.level;
    },

    highest: function(first, second) {
        return second.level - first.level;
    }

};


function sortSkillData(skillData, order) {

    let sortedSkills = skillData.slice();

    if (sortMethods[order]) {

        sortedSkills.sort(sortMethods[order]);

    }

    return sortedSkills;

}


if (typeof module !== "undefined") {

    module.exports = { sortSkillData };

}