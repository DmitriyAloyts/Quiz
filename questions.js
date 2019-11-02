var scontainerEl = document.getElementById("scontainer");
var qcontainerEl = document.getElementById("qcontainer");
var icontainerEl = document.getElementById("icontainer");
var hcontainerEl = document.getElementById("hcontainer");

var interval;
var secondsLeft;
var index;

var startbtnEl = document.getElementById("startbtn");
var submitbtnEl = document.getElementById("submitbtn");
var gobackbtnEl = document.getElementById("gobackbtn");
var clearbtnEl = document.getElementById("clearbtn");

var secondsEl = document.querySelector(".seconds");
var choiceListEl = document.getElementById("choiceList");
var scoreEl = document.getElementById("score");
var initialsInput = document.querySelector("#ini");
var highscoreEl = document.getElementById("highscore");

var highscore =
{
  initials: "",
  score: ""
};

var questions = [
  {
    title: "1 The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "2 Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "3 Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "4 The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "5 Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
];

function loadStart() {
  scontainerEl.setAttribute("style", "display:block;");
  qcontainerEl.setAttribute("style", "display:none;");
  icontainerEl.setAttribute("style", "display:none;");
  hcontainerEl.setAttribute("style", "display:none;");
}

function clearHighscore() {
  localStorage.removeItem("highscore");
  loadHighscore();
}

function loadHighscore() {
  scontainerEl.setAttribute("style", "display:none;");
  qcontainerEl.setAttribute("style", "display:none;");
  icontainerEl.setAttribute("style", "display:none;");
  hcontainerEl.setAttribute("style", "display:block;");
  highscoreList.innerHTML = "";

  // Get stored highscore from localStorage
  // Parsing the JSON string to an object
  var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
  if (storedHighscore !== null) {
    // Clear highscoreList element
    var user = storedHighscore.initials;
    var s = storedHighscore.score;

    var li = document.createElement("li");
    li.textContent = user + " - " + s;
    // console.log("li.textContent: " + li.textContent);
    highscoreList.appendChild(li);
  }
}

function setInitials() {
  var initialsText = initialsInput.value.trim();
  if (initialsText === "") {
    return;
  }
  var highscore = { initials: initialsText, score: secondsLeft }
  localStorage.setItem("highscore", JSON.stringify(highscore));
  loadHighscore();
}

function loadScore() {
  scontainerEl.setAttribute("style", "display:none;");
  qcontainerEl.setAttribute("style", "display:none;");
  icontainerEl.setAttribute("style", "display:block;");
  hcontainerEl.setAttribute("style", "display:none;");

  clearInterval(interval);
  scoreEl.textContent = secondsLeft;
}

function checkAnswer(event) {
  var ans = event.target.innerText;
  var ind = event.target.getAttribute("data-index");

  // console.log("ans=" + ans);
  // console.log("ind=" + ind);
  if (ans === questions[index].answer) {
    okorno.innerHTML = "Correct";
  }
  else {
    okorno.innerHTML = "Wrong";
    secondsLeft = secondsLeft - 10;
  }

  // console.log("okorno.innerHTML=" + okorno.innerHTML);

  index++;
  if ((index < questions.length) && (secondsLeft > 0)) {
    renderQuestions();
  }
  else {
    loadScore()
  }
}

function renderQuestions() {
  // Load question
  question.innerHTML = questions[index].title;
  // console.log("question: " + question.innerHTML);
  // console.log("answers: " + questions[index].choices);

  // Render a multiple choice answers for each question
  choiceList.innerHTML = "";
  for (var i = 0; i < 4; i++) {
    var choice = questions[index].choices[i];
    var li = document.createElement("li");
    li.textContent = choice;
    li.setAttribute("data-index", i);
    choiceList.appendChild(li);
    // console.log("choice" + choice);
    // console.log("index" + index);
    // console.log("i" + i);
  }
  choiceListEl.addEventListener("click", checkAnswer);
}

function startQuiz() {
  clearInterval(interval);

  secondsLeft = questions.length * 15;
  index = 0;
  scontainerEl.setAttribute("style", "display:none;");
  qcontainerEl.setAttribute("style", "display:block;");
  icontainerEl.setAttribute("style", "display:none;");
  hcontainerEl.setAttribute("style", "display:none;");


  renderQuestions();

  interval = setInterval(function () {
    secondsLeft--;
    secondsEl.textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

loadStart();

startbtnEl.addEventListener("click", startQuiz);
submitbtnEl.addEventListener("click", setInitials);
gobackbtnEl.addEventListener("click", loadStart);
clearbtnEl.addEventListener("click", clearHighscore);
highscoreEl.addEventListener("click", loadHighscore);