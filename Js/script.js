let levelInputs = document.querySelectorAll('input[id$="-level"]');

for (let i = 0; i < levelInputs.length; i++) {

    levelInputs[i].addEventListener("change", function() {

        let level = Number(this.value);

        if (this.value === "" || !Number.isInteger(level) || level < 1 || level > 99) {
            alert("Skill levels must be between 1 and 99.");
            this.value = 1;
        }

        let skill = this.id.replace("-level", "");
        let targetInput = document.getElementById(skill + "-target");

        if (Number(targetInput.value) < Number(this.value)) {
            targetInput.value = this.value;
        }

    });

}


let xpInputs = document.querySelectorAll('input[id$="-xp"]');

for (let i = 0; i < xpInputs.length; i++) {

    xpInputs[i].addEventListener("change", function() {

        let xp = Number(this.value);

        if (this.value === "" || !Number.isInteger(xp) || xp < 0) {
            alert("XP must be a positive whole number or zero.");
            this.value = 0;
        }

    });

}


let targetInputs = document.querySelectorAll('input[id$="-target"]');

for (let i = 0; i < targetInputs.length; i++) {

    targetInputs[i].addEventListener("change", function() {

        let target = Number(this.value);

        let skill = this.id.replace("-target", "");
        let currentLevel = Number(document.getElementById(skill + "-level").value);

        if (this.value === "" || !Number.isInteger(target) || target < currentLevel || target > 99) {
            alert("Target levels must be between your current level and 99.");
            this.value = currentLevel;
        }

    });

}


let xpTable = [];
let totalXP = 0;

xpTable[1] = 0;

for (let level = 1; level < 99; level++) {

    totalXP += Math.floor(level + 300 * Math.pow(2, level / 7));

    xpTable[level + 1] = Math.floor(totalXP / 4);

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

    for (let i = 0; i < levelInputs.length; i++) {

        let skill = levelInputs[i].id.replace("-level", "");

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


    for (let i = 0; i < levelInputs.length; i++) {

        let skill = levelInputs[i].id.replace("-level", "");

        let levelInput = document.getElementById(skill + "-level");
        let xpInput = document.getElementById(skill + "-xp");
        let targetInput = document.getElementById(skill + "-target");

        localStorage.setItem(skill + "-level", levelInput.value);
        localStorage.setItem(skill + "-xp", xpInput.value);
        localStorage.setItem(skill + "-target", targetInput.value);

    }

    alert("Progress saved successfully!");

}


function loadProgress() {

    for (let i = 0; i < levelInputs.length; i++) {

        let skill = levelInputs[i].id.replace("-level", "");

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


document.getElementById("save-button").addEventListener("click", saveProgress);

loadProgress();


for (let i = 0; i < levelInputs.length; i++) {

    let skill = levelInputs[i].id.replace("-level", "");

    let xpInput = document.getElementById(skill + "-xp");

    levelInputs[i].addEventListener("change", function() {
        calculateSkillXP(skill);
    });

    xpInput.addEventListener("change", function() {
        calculateSkillXP(skill);
    });

    calculateSkillXP(skill);

}