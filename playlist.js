```javascript
// =========================================================
// NEXO - LEARNING PLAYLIST
// =========================================================


// Playlist container
const playlistContainer =
    document.getElementById("playlist-container");


// Beginner playlist
const beginnerPlaylist = [

    {
        number: "01",
        title: "HTML Basics",
        description: "Learn the structure of a web page.",
        duration: "18 min",
        type: "FREE"
    },

    {
        number: "02",
        title: "HTML Elements",
        description: "Understand headings, paragraphs, links and images.",
        duration: "22 min",
        type: "FREE"
    },

    {
        number: "03",
        title: "CSS Basics",
        description: "Learn how to style your first web page.",
        duration: "20 min",
        type: "FREE"
    },

    {
        number: "04",
        title: "CSS Layout",
        description: "Learn Flexbox and create better layouts.",
        duration: "25 min",
        type: "FREE"
    },

    {
        number: "05",
        title: "Build Your First Page",
        description: "Put everything together and create a real webpage.",
        duration: "30 min",
        type: "FREE"
    }

];


// Display playlist
function displayPlaylist() {

    playlistContainer.innerHTML = "";

    beginnerPlaylist.forEach((lesson, index) => {

        const lessonCard = document.createElement("div");

        lessonCard.className = "lesson-card";

        lessonCard.innerHTML = `

            <div class="lesson-number">
                ${lesson.number}
            </div>

            <div class="lesson-info">

                <div class="lesson-top">

                    <span class="lesson-type">
                        ${lesson.type}
                    </span>

                    <span class="lesson-duration">
                        ${lesson.duration}
                    </span>

                </div>

                <h3>
                    ${lesson.title}
                </h3>

                <p>
                    ${lesson.description}
                </p>

            </div>

            <button
                class="lesson-button"
                onclick="startLesson(${index})"
            >
                →
            </button>

        `;

        playlistContainer.appendChild(lessonCard);

    });

}


// Start lesson
function startLesson(index) {

    const lesson = beginnerPlaylist[index];

    alert(
        "Starting: " + lesson.title
    );

}


// Back button
function goBack() {
    window.history.back();
}


// Start playlist
displayPlaylist();
```
