const questions = [
    {
        question: "Welche Stadt ist bekannt für ihre große Anzahl an Investoren?",
        answers: ["Zürich", "Silicon Valley", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    },
    {
        question: "Wo gibt es eine starke Forschung im Bereich Künstliche Intelligenz?",
        answers: ["Zürich", "Silicon Valley", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 0
    },
    {
        question: "Welche Stadt ist besonders stark in nachhaltigen Startups?",
        answers: ["Silicon Valley", "Zürich", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    },
    {
        question: "Welche Stadt hat eine stabilere wirtschaftliche Umgebung für Startups?",
        answers: ["Silicon Valley", "Zürich", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    },
    {
        question: "Welche Stadt ist stärker im Bereich Fintech und Medtech?",
        answers: ["Silicon Valley", "Zürich", "Beide sind gleich", "Keine der beiden"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;


function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElements = document.querySelectorAll(".answer");
    const statusElement = document.getElementById("score");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        answersElements[index].textContent = `${String.fromCharCode(65 + index)}) ${answer}`;
    });

    statusElement.textContent = `Richtige Antworten: ${score}`;
    startTimer();
}


function startTimer() {
    timeLeft = 30;
    const timerElement = document.getElementById("timer");

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Zeit: ${formatTime(timeLeft)}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


function checkAnswer(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (answerIndex === currentQuestion.correctAnswer) {
        score++;
    }

    nextQuestion();
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
}


showQuestion();
