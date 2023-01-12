function Quiz(question) {
  this.score = 0;
  this.question = question;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function () {
  return this.question[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.question.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

let question = [
  new Question(
    "HTML is what type of language",
    [
      "Scripting Language",
      "Markup Language",
      "Programming Language",
      "Network Protocol",
    ],
    "Markup Language"
  ),
  new Question(
    "HTML uses",
    [
      "User defined tags",
      "Pre-specified tags",
      "Fixed tags defined by the language",
      "Tags only for linking",
    ],
    "Fixed tags defined by the language"
  ),
  new Question(
    "Fundamental HTML Block is known as ___________?",
    ["HTML Body", "HTML Tag", "HTML Attribute", "HTML Element"],
    "HTML Tag"
  ),
  new Question(
    "The year in which HTML was first proposed _______?",
    ["2000", "1986", "1988", "1990"],
    "1990"
  ),
  new Question(
    "Apart from b tag, what other tag makes text bold ",
    ["fat", "strong", "black", "emp"],
    "strong"
  ),
];

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;


    var choices = quiz.getQuestionByIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function showScores() {
  var gameOverHtml = "<h1>Results</h1>";
  gameOverHtml +=
    "<h2 id='score'> Your Scores:  " +
    quiz.score +
    " . And Percentage is: " +
    (quiz.score / question.length) * 100 +
    "%" +
    "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.question.length;
}

function handleOptionButton(id, choice) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

var quiz = new Quiz(question);

loadQuestions();
