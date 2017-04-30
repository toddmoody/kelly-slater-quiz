var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

var startContainer = document.getElementById("startContainer");
var startTitle = document.getElementById("start-title");
var startBlurb = document.getElementById("start-blurb");
var startBtn = document.getElementById("start-btn");

var container = document.getElementById("quizContainer");
var scoreDisplay = document.getElementById("score-display");
var questionResponse = document.getElementById("reponse-answer");
var questionEl = document.getElementById("question");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");
var answerStatement = document.getElementById("answer-statement");

var nextButton = document.getElementById("nextButton");
var submitButton = document.getElementById("submitButton");
var result = document.getElementById("result");
var finalScore = document.getElementById("final-score");
var restartBtn = document.getElementById("restart");

var selectedOption;
var answer;

// Main init function to handle start screen and trigger question sequence once button pressed.
function init(){
    // Hide the main display container until the play button pressed
    container.style.display = "none";
    // insert the start blurb & play button into the intro container
    startBlurb.textContent = "Welcome to the Kelly Slater Quiz. There are 11 questions - if you need to ask why, maybe you should grab a foam board and enroll in surf school.";
    // apply click listener to the Take Quiz button
    startBtn.addEventListener("click", function(){
    // hide the start button and allow main question container to display.
    startContainer.style.display = "none";
    container.style.display = "";
    });
    // apply click listener to submit button & trigger submit function. 
    submitButton.addEventListener("click", function(){   
        submit();
    });
    // apply click listener to next button & trigger load next question function. 
    nextButton.addEventListener("click", function(){
        loadNextQuestion();
    });
}
init();

// Question constructor function and running score display
function loadQuestion(questionIndex){
    nextButton.style.display = "none";
    scoreDisplay.textContent = "Score " + score + " out of 11";
    var q = questions[questionIndex];
    questionEl.textContent = 'Question ' + (questionIndex + 1) + ' of 11: ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
}
loadQuestion(currentQuestion);

// Next question function also updating next question to finish on last question and final score/summary screen
function loadNextQuestion() {
    currentQuestion++;
    submitButton.style.display = "";
    answerStatement.textContent = "";

    if(currentQuestion == totQuestions - 1) {
        nextButton.textContent = "Finish";
    }
    if(currentQuestion == totQuestions){
        container.style.display = "none";
        result.style.display = "";
        finalScore.textContent = "Your Score: " + score;
        // add click listener to take quiz again button & refresh
        restartBtn.addEventListener("click", function(){
            location.reload();
        });
        return;
    }
    loadQuestion(currentQuestion);
}

// Submit function triggered on submit click to manage correct/incorrect answer responses from array
function submit(){
    var selectedOption = document.querySelector("input[type=radio]:checked");
        if(!selectedOption){
            answerStatement.textContent = "You need to man up and make a call."
            return;
        }
        var answer = selectedOption.value;
        if(questions[currentQuestion].answer === answer){
            answerStatement.textContent = "That makes Kelly happy."
            score ++;
            submitButton.style.display = "none";
            nextButton.style.display = "";
        } else if(questions[currentQuestion].answer !== answer){
            answerStatement.textContent = (questions[currentQuestion].response);
            submitButton.style.display = "none";
            nextButton.style.display = "";
        }
}

