var model = {
  arrayInput: [""],
  number1: -1,
  number2: -1,
  subtraction: false,
  clear: function () {
    this.number1 = -1;
    this.number2 = -1;
    this.arrayInput = [""];
  },
  addToarrayInput: function (digit) {
    this.arrayInput.push(digit);
  },
  isAnswerCorrect: function (answer) {
    if (this.subtraction) {
      return answer === this.number1 - this.number2;
    }
    return answer === this.number1 + this.number2;
  },

  generateQuestion: function () {
    var arrayNumbers = getTwoRandomNumbers();
    var number1 = arrayNumbers[0];
    var number2 = arrayNumbers[1];

    if (Math.floor(Math.random() * 2)) {
      this.subtraction = false;
      this.number1 = number1;
      this.number2 = number2;
      view.displayQuestion(this.number1 + " + " + this.number2 + " = ?");
    } else {
      this.subtraction = true;
      if (number1 >= number2) {
        view.displayQuestion(number1 + " - " + number2 + " = ?");
        this.number1 = number1;
        this.number2 = number2;
      } else {
        view.displayQuestion(number2 + " - " + number1 + " = ?");
        this.number1 = number2;
        this.number2 = number1;
      }
    }
  },
};

var view = {
  displayMessage: function (msg) {
    document.getElementById("game-message").innerHTML = msg;
  },
  displayScore: function (score) {
    document.getElementById("points").innerHTML = score;
  },
  displayQuestion: function (qst) {
    document.getElementById("question").innerHTML = qst;
  },
  addToTextbox: function (digit) {
    document.getElementById("textbox").value += digit;
  },
  clearTextbox: function () {
    document.getElementById("textbox").value = "";
  },
  showButton: function (showButton, buttonName) {
    if (showButton === true) {
      document.getElementById(buttonName).style.visibility = "visible";
    } else {
      document.getElementById(buttonName).style.visibility = "hidden";
    }
  },
};

function clearAll() {
  view.clearTextbox();
  view.displayMessage("");
  view.displayQuestion("");
  view.displayScore(
    "Score: " + controller.points + "/" + controller.no_questions
  );
}

var randomComparator = function (number1, number2) {
  if (number1 === undefined || number2 === undefined) {
    alert("Incorrect input!");
  }
  if (Math.floor(Math.random() * 2) == true) {
    return number1 - number2;
  } else {
    return number2 - number1;
  }
};

function getTwoRandomNumbers() {
  var arrayNumbers = [];

  arrayNumbers[0] = Math.ceil(Math.random() * 15);
  arrayNumbers[1] = Math.ceil(Math.random() * 25);
  arrayNumbers.sort(randomComparator);
  return arrayNumbers;
}

function parseGuess(guess) {
  var total = "";
  for (var i = 0; i < guess.length; i++) {
    total += guess[i];
  }
  return Number(total);
}

var controller = {
  counter: 0,
  points: 0,
  no_questions: 0,
  startGame: function (no_questions = 10) {
    this.counter = 0;
    this.points = 0;
    this.no_questions = no_questions;
    clearAll();
    view.showButton(false, "start-button");
    view.showButton(true, "calculate-button");
    this.playGame();
  },
  playGame: function () {
    model.clear();
    view.clearTextbox();
    this.counter++;

    if (this.counter <= this.no_questions) {
      model.generateQuestion();
      console.log("counter === " + this.counter);
    } else if (this.counter > this.no_questions) {
      view.showButton(true, "start-button");
      view.showButton(false, "calculate-button");
    }
  },
  submitAnswer: function () {
    var userAnswer = parseGuess(model.arrayInput);
    if (model.isAnswerCorrect(userAnswer)) {
      this.points++;
      view.displayMessage("Correct answer! Well done :)");
    } else {
      view.displayMessage("Wrong answer :(");
    }
    view.displayScore("Score: " + this.points + "/" + this.no_questions);
    this.playGame();
  },
  addDigit: function (digit) {
    view.addToTextbox(digit);
    model.addToarrayInput(digit);
  },
};

window.onload = controller.startGame(10);
