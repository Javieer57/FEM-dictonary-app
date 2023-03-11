const dropdown = document.querySelector(".dropdown");
const button = dropdown.querySelector(".dropdown__button");
const menu = dropdown.querySelector(".dropdown__menu");

button.addEventListener("click", toggleDropdown);
button.addEventListener("keydown", handleButtonKeydown);
menu.addEventListener("keydown", handleMenuKeydown);

function toggleDropdown() {
  const isOpen = dropdown.classList.toggle("dropdown--open");
  dropdown.setAttribute("aria-expanded", isOpen.toString());
  menu.setAttribute("aria-hidden", (!isOpen).toString());
}

function handleButtonKeydown(event) {
  if (event.code === "Space" || event.code === "Enter") {
    // Space and Enter keys
    event.preventDefault();
    toggleDropdown();
  } else if (event.code === "Escape") {
    dropdown.classList.remove("dropdown--open");
    dropdown.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }
}

function handleMenuKeydown(event) {
  if (event.code === "Escape") {
    dropdown.classList.remove("dropdown--open");
    button.focus();
  }
}
