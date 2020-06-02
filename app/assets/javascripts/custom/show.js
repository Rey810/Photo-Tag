let targetBox;
let options;
let img;
let characterDataUrl = "http://localhost:3000/puzzles";
let characterData;

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

    // //start timer
    // let currTime = 0;
    // let timer = setInterval(() => {
    //   currTime += 1;
    //   console.log(currTime);
    // }, 1000);
    // check chosen character and x, y points before sending to server
  }
});

async function getCharacterPositions() {
  let puzzleID = document.querySelector("h1").dataset.id;
  fetch(`${characterDataUrl}/${puzzleID}.json`)
    .then((res) => res.json())
    .then((data) => (characterData = data))
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
  console.table(selectedArea);
  console.log(charName);

  // get coordinates from database
  // characterData contains an array of character objects
  // if the x co-ordinate of selected character is between the rightX and leftX AND the y-coordinate is between the topY and bottomY, alert that it's been found!
  checkName(charName);

  function checkName(chosenName) {
    characterData.forEach((obj) => {
      console.log("charName", obj.name);
      obj.name === chosenName ? checkPoints(selectedArea, obj) : false;
    });
  }

  function checkPoints(chosenArea, character) {
    console.log("inside checkPoints");
    console.table(chosenArea);
    console.table(character);
    // compare the x points
    const { topLeftX, topRightX } = { ...chosenArea };
    const { x_position, y_position } = { ...character };
    if (x_position > topLeftX && x_position < topRightX) {
      alert(`You found ${character.name}!`);
    }
  }
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
