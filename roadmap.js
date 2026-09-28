// =========================================================
// NEXO - PERSONALIZED ROADMAP
// =========================================================


// =========================================================
// GET TEST RESULT
// =========================================================

const score = Number(
    localStorage.getItem("nexoLevelTestScore")
);

const percentage = Number(
    localStorage.getItem("nexoLevelTestPercentage")
);


// =========================================================
// ELEMENTS
// =========================================================

const roadmapContainer =
    document.getElementById("roadmap");

const levelText =
    document.getElementById("level-text");


// =========================================================
// DETERMINE LEVEL
// =========================================================

let level = "Beginner";

if (percentage >= 70) {

    level = "Advanced";

} else if (percentage >= 40) {

    level = "Intermediate";

}


// =========================================================
// SHOW LEVEL
// =========================================================

if (levelText) {

    levelText.textContent = level;

}


// =========================================================
// ROADMAP
// =========================================================

const roadmapData = [

    {
        number: 1,
        title: "HTML & CSS",
        description: "Start Here",
        badge: "Beginner",
        startAt: 0
    },

    {
        number: 2,
        title: "JavaScript",
        description: "Unlock after HTML & CSS",
        badge: "Intermediate",
        startAt: 35
    },

    {
        number: 3,
        title: "React",
        description: "Unlock after JavaScript",
        badge: "Advanced",
        startAt: 55
    },

    {
        number: 4,
        title: "Backend (Node.js)",
        description: "Unlock after React",
        badge: "Advanced",
        startAt: 75
    },

    {
        number: 5,
        title: "Projects",
        description: "Build & Showcase",
        badge: "",
        startAt: 90
    }

];


// =========================================================
// FIND STARTING POINT
// =========================================================

let startIndex = 0;

if (percentage >= 90) {

    startIndex = 4;

} else if (percentage >= 75) {

    startIndex = 3;

} else if (percentage >= 55) {

    startIndex = 2;

} else if (percentage >= 35) {

    startIndex = 1;

} else {

    startIndex = 0;

}


// =========================================================
// CREATE ROADMAP
// =========================================================

if (roadmapContainer) {

    roadmapContainer.innerHTML = "";


    roadmapData.forEach((item, index) => {

        let description = item.description;

        let badge = item.badge;

        let state = "locked";


        // ---------------------------------------------
        // CURRENT STARTING POINT
        // ---------------------------------------------

        if (index === startIndex) {

            state = "current";

            description = "Start Here";

        }


        // ---------------------------------------------
        // ALREADY PASSED
        // ---------------------------------------------

        else if (index < startIndex) {

            state = "completed";

            description = "Already covered";

        }


        // ---------------------------------------------
        // FUTURE STEPS
        // ---------------------------------------------

        else {

            state = "locked";

            if (index === 1) {

                description = "Unlock after HTML & CSS";

            }

            if (index === 2) {

                description = "Unlock after JavaScript";

            }

            if (index === 3) {

                description = "Unlock after React";

            }

            if (index === 4) {

                description = "Build & Showcase";

            }

        }


        // ---------------------------------------------
        // CREATE ELEMENT
        // ---------------------------------------------

        const step = document.createElement("div");

        step.className =
            `roadmap-item ${state}`;


        // ---------------------------------------------
        // BADGE
        // ---------------------------------------------

        let badgeHTML = "";

        if (badge !== "") {

            badgeHTML = `
                <span class="roadmap-badge">
                    ${badge}
                </span>
            `;

        }


        // ---------------------------------------------
        // CHECK ICON
        // ---------------------------------------------

        let icon = item.number;

        if (state === "completed") {

            icon = "✓";

        }


        // ---------------------------------------------
        // HTML
        // ---------------------------------------------

        step.innerHTML = `

            <div class="roadmap-line">

                <div class="roadmap-circle">
                    ${icon}
                </div>

            </div>


            <div class="roadmap-card">

                <div class="roadmap-card-number">
                    ${item.number}
                </div>


                <div class="roadmap-card-info">

                    <div class="roadmap-title-row">

                        <h3>
                            ${item.title}
                        </h3>

                        ${badgeHTML}

                    </div>


                    <p>
                        ${description}
                    </p>

                </div>

            </div>

        `;


        roadmapContainer.appendChild(step);

    });

}


// =========================================================
// SAVE DATA
// =========================================================

localStorage.setItem(
    "nexoUserLevel",
    level
);

localStorage.setItem(
    "nexoRoadmapStart",
    startIndex
);


// =========================================================
// DEBUG
// =========================================================

console.log("NEXO ROADMAP");
console.log("Score:", score);
console.log("Percentage:", percentage);
console.log("Level:", level);
console.log("Starting step:", startIndex + 1);