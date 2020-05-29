let targetBox;
let options;
let img;

// Rails uses turbolinks: intercepts link clicks and makes an ajax request. Replaces body with new content
// This event is called turbolinks:load
document.addEventListener("turbolinks:load", () => {
  if (document.title === "Game") {
    // this needs to be run on DOM load
    targetBox = document.querySelector(".target-box");
    options = document.querySelector(".options");
    img = document.querySelector("img");
    // listen for a click and toggle box visibility andposition
    img.addEventListener("click", (e) => {
      togglePopUp();
      popUp({ X: e.pageX, Y: e.pageY });
    });
  }
});
// hides and shows target box and options
function togglePopUp() {
  targetBox.classList.toggle("hidden");
  options.classList.toggle("hidden");
}

// this will display a pop up box at the clicked position
function popUp({ X = 0, Y = 0 }) {
  console.dir(targetBox);
  positionBox(X, Y);
  positionOptions(X, Y);
}

// positions the targeting box
function positionBox(X, Y) {
  targetBox.style.left = `${X - targetBox.clientWidth / 2}px`;
  targetBox.style.top = `${Y - targetBox.clientHeight / 2}px`;
}

// positions the options independently of target box
function positionOptions(X, Y) {
  options.style.left = `${X + targetBox.clientWidth / 2 + 5}px`;
  options.style.top = `${Y - targetBox.clientHeight / 2}px`;
}
