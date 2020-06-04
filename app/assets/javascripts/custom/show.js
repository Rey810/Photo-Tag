let targetBox;
let options;
let img;
let characterDataUrl = "http://localhost:3000/puzzles";
let setNewTimeUrl = "http://localhost:3000/scores/new";
let characterData;
let characterFoundStatus;
let timer;
let currentTime = 0;
// Rails uses turbolinks: intercepts link clicks and makes an ajax request. Replaces body with new content
// This event is called turbolinks:load
document.addEventListener("turbolinks:load", () => {
  if (document.title === "Game") {
    targetBox = document.querySelector(".target-box");
    options = document.querySelector(".options");
    // add listeners to options
    let optionsButtons = document.querySelectorAll("li > button");
    optionsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(targetBox.style.left, targetBox.style.top);
        checkSelection({
          topLeftX: targetBox.style.left,
          topLeftY: targetBox.style.top,
          charName: button.value,
        });
      });
    });
    img = document.querySelector("img");
    // listen for a click and toggle box visibility andposition
    img.addEventListener("click", (e) => {
      togglePopUp();
      popUp({ X: e.pageX, Y: e.pageY });
    });

    getCharacterPositions();
    startTimer();
  }
});

async function getCharacterPositions() {
  let puzzleID = document.querySelector("h1").dataset.id;
  fetch(`${characterDataUrl}/${puzzleID}.json`)
    .then((res) => res.json())
    .then((data) => {
      characterData = data.puzzle_characters;
    })
    .catch((err) => console.log(err));
}

function checkSelection({
  topLeftX = 0,
  topLeftY = 0,
  boxWidth = 60,
  boxHeight = 60,
  charName = "not a morty",
}) {
  let selectedArea = {
    topLeftX: parseInt(topLeftX),
    topLeftY: parseInt(topLeftY),

    topRightX: parseInt(topLeftX) + boxWidth,
    topRightY: parseInt(topLeftY),

    bottomLeftX: parseInt(topLeftX),
    bottomLeftY: parseInt(topLeftY) + boxHeight,

    bottomRightX: parseInt(topLeftX) + boxWidth,
    bottomRightY: parseInt(topLeftY) + boxHeight,
  };

  checkSelection(charName);

  // if the name is found (which it always will be) check the selected points
  function checkSelection(chosenName) {
    characterData.forEach((character) => {
      character.name === chosenName
        ? checkPoints(selectedArea, character)
        : false;
    });
  }

  // compares the selected points with the characters x and y position
  function checkPoints(chosenArea, character) {
    const { topLeftX, topRightX, topLeftY, bottomLeftY } = { ...chosenArea };
    const { x_position, y_position, name } = { ...character };
    console.log(
      "x1",
      topLeftX,
      "x2",
      topRightX,
      "name",
      name,
      "at",
      x_position
    );
    // check if the selected points match the character position
    if (
      x_position > topLeftX &&
      x_position < topRightX &&
      y_position < bottomLeftY &&
      y_position > topLeftY
    ) {
      updateFoundStatus(name);
      // hide box
      togglePopUp();
      // yay!
      displayCharacterFound(name);
      // runs endGame() if all characters are found
      checkGameOver();
    } else {
      // toggle the box and display a "Get your head out of your ass, Morty!"
      togglePopUp();
    }
  }
}

// run each time a button is clicked
function checkGameOver() {
  if (characterData.every((character) => character.found === true)) endGame();
}

// start the timer
function startTimer() {
  let timerDisplay = document.querySelector("#time");
  timer = setInterval(() => {
    //   currTime += 1;
    currentTime += 1;
    timerDisplay.textContent = `${currentTime}s`;
  }, 1000);
}
// stop the timer
function stopTimer() {
  clearInterval(timer);
}

function showForm() {
  let form = document.querySelector(".form-container");
  form.classList.toggle("hidden");
  // visible time score
  let time = form.querySelector(".end-time");
  time.textContent = `${currentTime}s`;

  // hidden form value to be submitted to back-end
  let endTime = form.querySelector("#end_time");
  endTime.value = currentTime;
}

// stop the timer and pop up the next modal
function endGame() {
  stopTimer();
  showForm();
}

function updateFoundStatus(characterName) {
  // changes the characters found status to true
  characterData.forEach((character) => {
    if (character.name === characterName) {
      character.found = true;
    }
  });
}
// a message with a timeout showing success!
function displayCharacterFound(characterName) {
  let name = characterName;
  let successDiv = document.createElement("div");
  successDiv.textContent = `Yay! You found ${name}!`;
  successDiv.classList.add("showSuccess");
  document.body.appendChild(successDiv);
  setTimeout(() => {
    document.body.removeChild(successDiv);
  }, 2000);
}

// hides and shows target box and options
function togglePopUp() {
  targetBox.classList.toggle("hidden");
  options.classList.toggle("hidden");
}

// this will display a pop up box at the clicked position
function popUp({ X = 0, Y = 0 }) {
  positionBox(X, Y);
  positionOptions(X, Y);
}

// positions the targeting box
function positionBox(X, Y) {
  console.group("box");
  console.log("centerX", X, "centerY", Y);
  console.log(
    "bottom right",
    X + targetBox.clientWidth / 2,
    Y + targetBox.clientWidth / 2
  );
  console.log(
    "bottom left",
    X - targetBox.clientWidth / 2,
    Y + targetBox.clientWidth / 2
  );
  console.log(
    "top left",
    X - targetBox.clientWidth / 2,
    Y - targetBox.clientWidth / 2
  );
  console.log(
    "top right",
    X + targetBox.clientWidth / 2,
    Y - targetBox.clientWidth / 2
  );
  console.groupEnd();

  targetBox.style.left = `${X - targetBox.clientWidth / 2}px`;
  targetBox.style.top = `${Y - targetBox.clientHeight / 2}px`;
}

// positions the options independently of target box
function positionOptions(X, Y) {
  options.style.left = `${X + targetBox.clientWidth / 2 + 5}px`;
  options.style.top = `${Y - targetBox.clientHeight / 2}px`;
}
