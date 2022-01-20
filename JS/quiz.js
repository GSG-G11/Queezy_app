import { questions } from "../Assets/quizbank.js";

let currentQuestionNumber = 1;
let correctAnswers = 0;
let currentQuestion = null;
const next = () => {
  const selectedAnswer = document.querySelector(
    'input[name="answers"]:checked'
  ).value;
  if (!selectedAnswer) return;
  if (currentQuestionNumber === 10) {
    let usersName = localStorage.getItem("userName");
    const localResult = localStorage.getItem("results");
    if (localResult) {
      const resultParsed = JSON.parse(localResult);
      resultParsed.push({ name: usersName, result: correctAnswers });
      localStorage.setItem("results", JSON.stringify(resultParsed));
    } else {
      const newResult = [{ name: usersName, result: correctAnswers }];
      localStorage.setItem("results", JSON.stringify(newResult));
    }
    showResult(usersName, correctAnswers);
  } else if (selectedAnswer === currentQuestion.answer) {
    currentQuestionNumber++;
    correctAnswers += 1;
    render();
  } else {
    currentQuestionNumber++;
    render();
  }
};

const showResult = (username, correctAnswers) => {
  document.querySelector(".main").innerHTML = "";
  const result = document.createElement("div");
  result.className = "question-section";
  let resultDiv = document.createElement("p");
  resultDiv.className = "question-counter";
  resultDiv.innerText = `${username}: Your Score is ${correctAnswers}`;
  result.appendChild(resultDiv);
  document.querySelector(".main").appendChild(result);
};

const render = () => {
  // random number
  const randomNumberQuestion = Math.trunc(Math.random() * 18) + 1;
  document.querySelector(".question-section").innerHTML = "";
  let questionNumber = document.createElement("p");
  questionNumber.className = "question-counter";
  questionNumber.innerText = `# Question ${currentQuestionNumber}/10`;
  let questionText = document.createElement("div");
  questionText.className = "question-container";
  questionText.innerText = "";
  //delete the conntent

  document.querySelector(".question-section").appendChild(questionNumber);
  document.querySelector(".question-section").appendChild(questionText);

  let answerContainer = document.createElement("div");
  answerContainer.className = "question-container";

  const randomQuestion = questions[randomNumberQuestion];
  currentQuestion = randomQuestion;
  randomQuestion.answers.map((answer, index) => {
    let radioButton1 = document.createElement("input");
    radioButton1.setAttribute("type", "radio");
    radioButton1.setAttribute("id", `answer-${index}`);
    radioButton1.setAttribute("name", "answers");
    radioButton1.setAttribute("value", answer);
    let labelForRadio1 = document.createElement("label");
    labelForRadio1.setAttribute("for", "answer-1");
    labelForRadio1.innerText = answer;
    labelForRadio1.className = "radio-label";
    let space = document.createElement("br");
    answerContainer.appendChild(radioButton1);
    answerContainer.appendChild(labelForRadio1);
    answerContainer.appendChild(space);
  });

  document.querySelector(".question-section").appendChild(answerContainer);

  questionText.className = "question-container";
  questionText.innerText = questions[randomNumberQuestion].question;
  document.querySelector(".question-section").appendChild(questionText);

  answerContainer.className = "answer-container";
  document.querySelector(".question-section").appendChild(answerContainer);
};

document.querySelector(".next-button").addEventListener("click", next);
window.onload = render();
