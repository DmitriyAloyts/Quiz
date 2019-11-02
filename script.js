var startquizEl = document.getElementById("startquiz");

var secondsEl = document.querySelector("#seconds");
var secondsLeft = 75;
var questionsEl = document.getElementById("questions");
var startEl = document.getElementById("start");
console.log(questionsEl);
console.log(startEl);
console.log(secondsEl);



function setTime() {
  startEl.setAttribute("style","display:none;");
  var timerInterval = setInterval(function() {
    secondsLeft--;
    secondsEl.textContent = secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

startquizEl.addEventListener("click", setTime); 