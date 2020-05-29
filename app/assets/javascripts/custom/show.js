// this needs to be run on DOM load
let targetBox;
let options;
let img;

document.addEventListener("DOMContentLoaded", () => {
  targetBox = document.querySelector(".target-box");
  options = document.querySelector(".options");
  img = document.querySelector("img");

  if (document.title === "Game") {
    // listen for a click and toggle box visibility and position
    img.addEventListener("click", (e) => {
      popUp({ X: e.pageX, Y: e.pageY });
    });
  }
});

// this will display a pop up box at the clicked position
function popUp({ X = 0, Y = 0 }) {
  console.dir(targetBox);
  positionBox(X, Y);
  positionOptions(X, Y);
}

function positionBox(X, Y) {
  targetBox.style.left = `${X - targetBox.clientWidth / 2}px`;
  targetBox.style.top = `${Y - targetBox.clientHeight / 2}px`;
}

function positionOptions(X, Y) {
  options.style.left = `${X + targetBox.clientWidth / 2 + 5}px`;
  options.style.top = `${Y - targetBox.clientHeight / 2}px`;
}
