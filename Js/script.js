let skills = [
    "attack",
    "hitpoints",
    "mining",
    "strength",
    "agility",
    "smithing",
    "defence",
    "herblore",
    "fishing",
    "ranged",
    "thieving",
    "cooking",
    "prayer",
    "crafting",
    "firemaking",
    "magic",
    "fletching",
    "woodcutting",
    "runecraft",
    "slayer",
    "farming",
    "construction",
    "hunter",
    "sailing"
];


let xpTable = [];
let totalXP = 0;

xpTable[1] = 0;

for (let level = 1; level < 99; level++) {

    totalXP += Math.floor(level + 300 * Math.pow(2, level / 7));

    xpTable[level + 1] = Math.floor(totalXP / 4);

}


function checkLevel(skill) {

    let levelInput = document.getElementById(skill + "-level");
    let targetInput = document.getElementById(skill + "-target");

    let level = Number(levelInput.value);

    if (levelInput.value === "" || !Number.isInteger(level) || level < 1 || level > 99) {

        alert("Skill levels must be between 1 and 99.");

        levelInput.value = 1;

    }

    if (Number(targetInput.value) < Number(levelInput.value)) {

        targetInput.value = levelInput.value;

    }

    calculateSkillXP(skill);

}


function checkXP(skill) {

    let xpInput = document.getElementById(skill + "-xp");

    let xp = Number(xpInput.value);

    if (xpInput.value === "" || !Number.isInteger(xp) || xp < 0) {

        alert("XP must be a positive whole number or zero.");

        xpInput.value = 0;

    }

    calculateSkillXP(skill);

}


function checkTarget(skill) {

    let levelInput = document.getElementById(skill + "-level");
    let targetInput = document.getElementById(skill + "-target");

    let level = Number(levelInput.value);
    let target = Number(targetInput.value);

    if (targetInput.value === "" || !Number.isInteger(target) || target < level || target > 99) {

        alert("Target levels must be between your current level and 99.");

        targetInput.value = level;

    }

}


function calculateSkillXP(skill) {

    let levelInput = document.getElementById(skill + "-level");
    let xpInput = document.getElementById(skill + "-xp");
    let xpDisplay = document.getElementById(skill + "-xp-needed");

    let level = Number(levelInput.value);
    let xp = Number(xpInput.value);

    if (levelInput.value === "" || xpInput.value === "" ||
        !Number.isInteger(level) || !Number.isInteger(xp) ||
        level < 1 || level > 99 || xp < 0) {

        xpDisplay.textContent = "Enter valid skill information.";

    } else if (level === 99) {

        if (xp >= xpTable[99]) {

            xpDisplay.textContent = "Maximum level reached!";

        } else {

            xpDisplay.textContent = "Current XP does not match the skill level.";

        }

    } else if (xp < xpTable[level] || xp >= xpTable[level + 1]) {

        xpDisplay.textContent = "Current XP does not match the skill level.";

    } else {

        let xpNeeded = xpTable[level + 1] - xp;

        xpDisplay.textContent = "XP to next level: " + xpNeeded.toLocaleString();

    }

}


function saveProgress() {

    for (let i = 0; i < skills.length; i++) {

        let skill = skills[i];

        let levelInput = document.getElementById(skill + "-level");
        let xpInput = document.getElementById(skill + "-xp");
        let targetInput = document.getElementById(skill + "-target");

        let level = Number(levelInput.value);
        let xp = Number(xpInput.value);
        let target = Number(targetInput.value);

        if (levelInput.value === "" || xpInput.value === "" || targetInput.value === "" ||
            !Number.isInteger(level) || !Number.isInteger(xp) || !Number.isInteger(target) ||
            level < 1 || level > 99 || xp < 0 || target < level || target > 99) {

            alert("Please check the skill information for " + skill + ".");

            return;

        }

        if (xp < xpTable[level] || (level < 99 && xp >= xpTable[level + 1])) {

            alert("Current XP does not match the skill level for " + skill + ".");

            return;

        }

    }


    for (let i = 0; i < skills.length; i++) {

        let skill = skills[i];

        let level = document.getElementById(skill + "-level").value;
        let xp = document.getElementById(skill + "-xp").value;
        let target = document.getElementById(skill + "-target").value;

        localStorage.setItem(skill + "-level", level);
        localStorage.setItem(skill + "-xp", xp);
        localStorage.setItem(skill + "-target", target);

    }

    alert("Progress saved successfully!");

}


function loadProgress() {

    for (let i = 0; i < skills.length; i++) {

        let skill = skills[i];

        let level = localStorage.getItem(skill + "-level");
        let xp = localStorage.getItem(skill + "-xp");
        let target = localStorage.getItem(skill + "-target");

        if (level !== null && xp !== null && target !== null) {

            document.getElementById(skill + "-level").value = level;
            document.getElementById(skill + "-xp").value = xp;
            document.getElementById(skill + "-target").value = target;

        }

    }

}


for (let i = 0; i < skills.length; i++) {

    let skill = skills[i];

    document.getElementById(skill + "-level").onchange = function() {
        checkLevel(skill);
    };

    document.getElementById(skill + "-xp").onchange = function() {
        checkXP(skill);
    };

    document.getElementById(skill + "-target").onchange = function() {
        checkTarget(skill);
    };

}


document.getElementById("save-button").onclick = saveProgress;

loadProgress();

for (let i = 0; i < skills.length; i++) {

    calculateSkillXP(skills[i]);

}