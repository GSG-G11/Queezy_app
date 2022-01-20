//get the element from html
let startButton = document.querySelector(".start-button");
let nameInput = document.querySelector(".user-name-input");
// add function to start button
startButton.addEventListener("click", function () {
  let nameInputValue = nameInput.value;
  // save the user name in local storage
  localStorage.setItem("userName", `${nameInputValue}`);
  //read the object from local storage
  let usersName = localStorage.getItem("userName");
  // to move quiz page
  window.location = "../HTML/quiz.html";
});
