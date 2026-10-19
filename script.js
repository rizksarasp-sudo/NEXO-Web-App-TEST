console.log("NEXO JavaScript is working!");

// =========================
// SUPABASE
// =========================

const SUPABASE_URL = "https://ocgftetusfsatjiaydxe.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_wcPpnueVJAs3nLiogdStvA_aPIT3B2w";

let supabaseClient = null;

if (window.supabase) {

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

}

// =========================
// SIGNUP
// =========================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("signup-message");

        message.textContent = "Creating your account...";

        try {

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name
                    }
                }
            });

            if (error) {

                console.log(error);

                message.textContent = "❌ " + error.message;

                return;
            }

            console.log("Account created:", data);

            message.textContent =
                "✅ Account created successfully!";

            // Go to role selection

            setTimeout(function () {
                window.location.href = "role-selection.html";
            }, 1000);

        } catch (error) {

            message.textContent =
                "❌ Error: " + error.message;
        }

    });
}



// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim();

        const password = document
            .getElementById("login-password")
            .value;

        const message = document.getElementById("login-message");

        message.textContent = "Logging in...";

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {

            message.textContent = "❌ " + error.message;

            return;
        }

        message.textContent = "✅ Login successful!";

        setTimeout(function () {
            window.location.href = "role-selection.html";
        }, 1000);
    });
}


// =========================
// GOOGLE LOGIN
// =========================

const googleLogin = document.getElementById("google-login");

if (googleLogin) {

    googleLogin.addEventListener("click", async function () {

        const { error } =
            await supabaseClient.auth.signInWithOAuth({
                provider: "google"
            });

        if (error) {
            document.getElementById("login-message").textContent =
                "❌ " + error.message;
        }

    });
}


// =========================
// GITHUB LOGIN
// =========================

const githubLogin = document.getElementById("github-login");

if (githubLogin) {

    githubLogin.addEventListener("click", async function () {

        const { error } =
            await supabaseClient.auth.signInWithOAuth({
                provider: "github"
            });

        if (error) {
            document.getElementById("login-message").textContent =
                "❌ " + error.message;
        }

    });
}

// =========================================================
// NEXO - LEVEL TEST
// =========================================================

const questions = [

    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: ["<link>", "<a>", "<href>"],
        correct: 1
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        answers: ["<p>", "<paragraph>", "<text>"],
        correct: 0
    },

    {
        question: "Which language is used to style a web page?",
        answers: ["HTML", "CSS", "JavaScript"],
        correct: 1
    },

    {
        question: "Which CSS property changes the text color?",
        answers: ["font-size", "background", "color"],
        correct: 2
    },

    {
        question: "Which HTML tag is used to display an image?",
        answers: ["<image>", "<img>", "<picture>"],
        correct: 1
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [".", "#", "*"],
        correct: 1
    },

    {
        question: "Which symbol is used for a class selector in CSS?",
        answers: ["#", ".", "&"],
        correct: 1
    },

    {
        question: "Which keyword creates a variable in JavaScript?",
        answers: ["let", "make", "variable"],
        correct: 0
    },

    {
        question: "Which method displays a message in the browser console?",
        answers: ["console.log()", "print()", "message()"],
        correct: 0
    },

    {
        question: "Which operator is used to compare two values strictly?",
        answers: ["=", "===", "=>"],
        correct: 1
    },

    {
        question: "Which HTML tag creates the largest heading?",
        answers: ["<h6>", "<heading>", "<h1>"],
        correct: 2
    },

    {
        question: "Which CSS property changes the background color?",
        answers: ["background-color", "color", "bg-color"],
        correct: 0
    },

    {
        question: "Which HTML tag creates an unordered list?",
        answers: ["<ol>", "<list>", "<ul>"],
        correct: 2
    },

    {
        question: "Which JavaScript keyword is used to define a function?",
        answers: ["function", "def", "create"],
        correct: 0
    },

    {
        question: "Which HTML attribute specifies an image source?",
        answers: ["href", "src", "link"],
        correct: 1
    },

    {
        question: "Which CSS property controls the size of text?",
        answers: ["text-size", "font-size", "size"],
        correct: 1
    },

    {
        question: "Which JavaScript value represents a true/false value?",
        answers: ["Boolean", "String", "Number"],
        correct: 0
    },

    {
        question: "Which HTML element is used to create a button?",
        answers: ["<button>", "<click>", "<btn>"],
        correct: 0
    },

    {
        question: "Which CSS property controls the space inside an element?",
        answers: ["margin", "padding", "spacing"],
        correct: 1
    },

    {
        question: "Which language makes a web page interactive?",
        answers: ["CSS", "HTML", "JavaScript"],
        correct: 2
    }

];


let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;


// =========================================================
// LOAD QUESTION
// =========================================================

function loadQuestion() {

    const question = questions[currentQuestion];

    const questionNumber =
        document.getElementById("question-number");

    const questionText =
        document.getElementById("question-text");

    const answersContainer =
        document.getElementById("answers-container");

    const progressBar =
        document.getElementById("progress-bar");


    // Question number

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    // Question text

    questionText.textContent =
        question.question;


    // Progress

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Reset selected answer

    selectedAnswer = null;

    
    // Remove old answers

    answersContainer.innerHTML = "";


    // Create answers

    question.answers.forEach(function(answer, index) {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        const letter = document.createElement("span");
        letter.className = "answer-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.className = "answer-text";
        text.textContent = answer;

        button.appendChild(letter);
        button.appendChild(text);


        button.addEventListener("click", function() {

            selectAnswer(index, button);

        });


        answersContainer.appendChild(button);

    });

}


// =========================================================
// SELECT ANSWER
// =========================================================

function selectAnswer(index, button) {

    selectedAnswer = index;


    const allAnswers =
        document.querySelectorAll(".answer-btn");


    allAnswers.forEach(function(answer) {

        answer.classList.remove("selected");

    });


    button.classList.add("selected");

}


// =========================================================
// NEXT QUESTION
// =========================================================

function nextQuestion() {

    if (selectedAnswer === null) {

        alert("Please select an answer.");

        return;

    }


    // Check answer

    if (
        selectedAnswer ===
        questions[currentQuestion].correct
    ) {

        score++;

    }


    // Last question

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        finishTest();

        return;

    }


    // Next question

    currentQuestion++;

    loadQuestion();

}


// =========================================================
// FINISH TEST
// =========================================================

function finishTest() {

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    localStorage.setItem(
        "nexoLevelTestScore",
        score
    );


    localStorage.setItem(
        "nexoLevelTestPercentage",
        percentage
    );


    alert(
        `Test completed!\n\nYour score: ${score} / ${questions.length}`
    );


    // For now, return to home.
    // Later we'll create the Personalized Roadmap page.

    window.location.href = "student-session.html";

}


// =========================================================
// BACK BUTTON
// =========================================================

function goBack() {

    window.history.back();

}


// =========================================================
// START LEVEL TEST
// =========================================================

if (
    document.getElementById("answers-container")
) {

    loadQuestion();

}


/* =========================================
   NEXO — TEACHER PROFILE FORM
========================================= */

const teacherForm = document.getElementById("teacher-form");

if (teacherForm) {
    teacherForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = document.getElementById("teacher-message");
        const submitButton = teacherForm.querySelector(
            'button[type="submit"]'
        );

        if (!supabaseClient) {
            message.textContent = "Supabase is not connected.";
            return;
        }

        submitButton.disabled = true;
        message.textContent = "Saving your profile...";

        try {
            const { data: userData, error: userError } =
                await supabaseClient.auth.getUser();

            if (userError || !userData.user) {
                message.textContent =
                    "Please log in before submitting your profile.";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

                return;
            }

            const user = userData.user;

            const profile = {
                id: user.id,
                full_name: document
                    .getElementById("teacher-name").value.trim(),
                professional_email: document
                    .getElementById("teacher-email").value.trim(),
                professional_title: document
                    .getElementById("teacher-title").value.trim(),
                teaching_experience: document
                    .getElementById("teacher-experience").value,
                specialty: document
                    .getElementById("teacher-specialty").value,
                bio: document
                    .getElementById("teacher-bio").value.trim(),
                course_idea: document
                    .getElementById("teacher-course").value.trim() || null,
                portfolio_url: document
                    .getElementById("teacher-link").value.trim() || null
            };

            const { error } = await supabaseClient
                .from("teacher_profiles")
                .upsert(profile, { onConflict: "id" });

            if (error) {
                throw error;
            }

            message.textContent =
                "Your teacher profile has been saved successfully!";

            message.style.color = "#009966";

        } catch (error) {
            console.error("Teacher profile error:", error);

            message.textContent =
                "Could not save your profile: " + error.message;

            message.style.color = "#dc2626";

        } finally {
            submitButton.disabled = false;
        }
    });
}


/* =========================================
   NEXO — STUDENT SESSION BOOKING
========================================= */

const studentSessionForm =
    document.getElementById("student-session-form");

if (studentSessionForm) {
    studentSessionForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message =
            document.getElementById("student-session-message");

        const submitButton =
            studentSessionForm.querySelector('button[type="submit"]');

        if (!supabaseClient) {
            message.textContent = "Supabase is not connected.";
            return;
        }

        submitButton.disabled = true;
        message.style.color = "#7b8497";
        message.textContent = "Submitting your booking request...";

        try {
            const { data: authData, error: authError } =
                await supabaseClient.auth.getUser();

            if (authError || !authData.user) {
                message.textContent =
                    "Please log in before requesting a session.";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

                return;
            }

            const user = authData.user;

            const preferredDate =
                document.getElementById("session-date").value;

            const preferredTime =
                document.getElementById("session-time").value;

            const duration = Number(
                studentSessionForm.querySelector(
                    'input[name="duration"]:checked'
                ).value
            );

            if (duration < 15) {
                throw new Error("The session must be at least 15 minutes.");
            }

            const today = new Date();
            const todayString = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0")
            ].join("-");

            if (preferredDate < todayString) {
                throw new Error("Please choose today or a future date.");
            }

            const booking = {
                user_id: user.id,
                session_type: "student_kickstart",
                preferred_date: preferredDate,
                preferred_time: preferredTime,
                duration_minutes: duration,
                questions:
                    document.getElementById("session-questions")
                        .value.trim() || null,
                status: "pending"
            };

            const { error: bookingError } = await supabaseClient
                .from("session_bookings")
                .insert(booking);

            if (bookingError) {
                throw bookingError;
            }

            message.style.color = "#009966";
            message.textContent =
                "Your request has been submitted! The NEXO team will confirm your session.";

            studentSessionForm.reset();

        } catch (error) {
            console.error("Session booking error:", error);

            message.style.color = "#dc2626";
            message.textContent =
                "Could not submit your request: " + error.message;

        } finally {
            submitButton.disabled = false;
        }
    });
}
