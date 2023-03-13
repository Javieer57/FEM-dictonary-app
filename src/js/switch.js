const toggleSwitch = document.getElementById("toggle-switch");

toggleSwitch.addEventListener("click", toggleButton);

toggleSwitch.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    toggleButton();
  }
});

function toggleButton() {
  if (toggleSwitch.getAttribute("aria-pressed") === "false") {
    toggleSwitch.setAttribute("aria-pressed", "true");
  } else {
    toggleSwitch.setAttribute("aria-pressed", "false");
  }
}
