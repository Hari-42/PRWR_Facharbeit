const questions = [
    {
        question: "Welche Szene ist bekannt für die innovativsten Start-ups?",
        answers: ["Zürich", "Silicon Valley", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    },
    {
        question: "Wo gibt es einen starken Fokus auf nachhaltige Innovation?",
        answers: ["Zürich", "Silicon Valley", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 0
    },
    {
        question: "Welche Szene baut U-Boote?",
        answers: ["Zürich", "Silicon Valley", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 3
    },
    {
        question: "Welcher Start-up gehört nicht zu den anderen?",
        answers: ["Visa", "Scandit", "Cisco", "Wells Fargo"],
        correctAnswer: 1
    },
    {
        question: "Welche Szene ist fokussierter im Bereich Fintech und Blockchain?",
        answers: ["Silicon Valley", "Zürich", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    },
    {
        question: "Welcher Start-up wurde nicht bei Silicon Valley genannt?",
        answers: ["Apple", "Zoom", "Microsoft", "Facebook"],
        correctAnswer: 3
    },
    {
        question: "Welches der genannten Unternehmen ist bekannt für Hardware-Entwicklung?",
        answers: ["Apple", "Zoom", "Microsoft", "Facebook"],
        correctAnswer: 0
    },
    {
        question: "Welche Innovation ist besonders mit Zürich verbunden?",
        answers: ["Nachhaltige", "Autonome Fahrzeuge", "Social Media", "Computing"],
        correctAnswer: 0
    },
    {
        question: "Welcher Bereich wird oft mit Scandit in Verbindung gebracht?",
        answers: ["E-Commerce", "Fintech", "Augmented Reality", "Blockchain"],
        correctAnswer: 2
    },
    {
        question: "Welcher Start-up wurde nicht bei Zürich genannt?",
        answers: ["Lakera", "Twint", "Beekeeper", "Futurae"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElements = document.querySelectorAll(".answer");
    const statusElement = document.getElementById("score");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        answersElements[index].textContent = `${String.fromCharCode(65 + index)}) ${answer}`;
        answersElements[index].style.backgroundColor = ""; // Reset button color
        answersElements[index].style.color = "white"; // Reset text color
        answersElements[index].disabled = false; // Re-enable buttons
    });

    statusElement.textContent = `Richtige Antworten: ${score}`;
}

function checkAnswer(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const answersElements = document.querySelectorAll(".answer");

    // Highlight correct and/or incorrect answers
    answersElements.forEach((button, index) => {
        button.disabled = true; // Disable buttons to prevent multiple clicks
        if (index === currentQuestion.correctAnswer) {
            button.style.backgroundColor = "green";
        } else if (index === answerIndex && index !== currentQuestion.correctAnswer) {
            button.style.backgroundColor = "red";
        }
    });

    // Update score if the selected answer is correct
    if (answerIndex === currentQuestion.correctAnswer) {
        score++;
    }

    // Wait for 2 seconds before showing the next question
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const questionElement = document.getElementById("question");
    const answersElements = document.querySelectorAll(".answer");
    const statusElement = document.getElementById("score");

    questionElement.textContent = "Quiz beendet!";
    answersElements.forEach(button => button.style.display = "none");
    statusElement.textContent = `Du hast ${score} von ${questions.length} richtig beantwortet!`;

    // Add the "Zurück zur Startseite" button
    const homeButton = document.createElement("button");
    homeButton.textContent = "Zurück zur Startseite";
    homeButton.classList.add("answer"); // Adding the same style as the answer buttons
    homeButton.style.backgroundColor = "#4a90e2"; // Blue background like answer buttons
    homeButton.style.marginTop = "20px"; // Add some margin for spacing
    homeButton.addEventListener("click", function() {
        window.location.href = './index.html'; // Redirect to home page
    });

    // Append the button to the overlay
    const quizOverlay = document.querySelector(".quiz-overlay");
    quizOverlay.appendChild(homeButton);

}

showQuestion();
