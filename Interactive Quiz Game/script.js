const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "High Tech Machine Language", "Hyperlink Transfer Markup Language", "Highly Technical Meta Language"],
        answer: 0
    },
    {
        question: "What programming language is used for adding interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 2
    },
    {
        question: "What is the purpose of CSS?",
        options: ["Defines the structure of a web page", "Adds interactivity to web pages", "Controls data flow in web applications", "Styles the appearance of a web page"],
        answer: 3
    },
    {
        question: "What does the acronym HTTP stand for?",
        options: ["Hypertext Transfer Protocol", "Highly Technical Transfer Protocol", "Hyperlink Text Transfer Protocol", "High Tech Text Protocol"],
        answer: 0
    },
    {
        question: "What is a common way to manage the flow of data between a web server and a web browser?",
        options: ["API (Application Programming Interface)", "CLI (Command Line Interface)", "GUI (Graphical User Interface)", "FTP (File Transfer Protocol)"],
        answer: 0
    },
    // You can add more questions here
];


let currentQuestion = 0;
let score = 0;
let timeRemaining = 10; // Adjust timer duration as needed

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time-remaining");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");

function displayQuestion() {
  const question = questions[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = ""; // Clear previous options

  question.options.forEach((option, index) => {
    const optionEl = document.createElement("li");
    optionEl.textContent = option;
    optionEl.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(optionEl);
  });

  startTimer();
}

function startTimer() {
  timeRemaining = 10; // Reset timer for each question
  timerEl.textContent = timeRemaining;
  const timerInterval = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      checkAnswer(-1); // No answer selected within time limit
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  const question = questions[currentQuestion];
  if (selectedOption === question.answer) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Incorrect. The correct answer is " + questions[currentQuestion].options[question.answer];
  }
  showNextButton();
}

function showNextButton() {
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion === questions.length) {
        clearInterval(timeRemaining);
      showFinalScore();
    } else {
      displayQuestion();
      feedbackEl.textContent = ""; // Clear feedback for next question
      nextBtn.style.display = "none"; // Hide next button until answer is selected
    }
  });
  
  function showFinalScore() {
    finalScoreEl.textContent = "Final Score: " + score + " out of " + questions.length;
    nextBtn.style.display = "none"; // Hide next button after final score
    optionsEl.innerHTML = ""; // Clear options
    questionEl.textContent = "Quiz Finished!";
    // Here's the timer stopping functionality:
    clearInterval(timerInterval); // Clear any existing timer interval
  }
  displayQuestion();