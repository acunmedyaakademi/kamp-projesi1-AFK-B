export let data = [];

async function getData() {
  const response = await fetch("../../data.json").then((x) => x.json());
  localStorage.data = JSON.stringify(response);
  return response;
}

if (localStorage.data) {
  data = JSON.parse(localStorage.data);
} else {
  data = await getData();
}

const hamburgerMenu = document.querySelector(".hamburgerMenuInput");
const hamburgerMenuDialog = document.querySelector(".hamburger-menu-container");

hamburgerMenu.addEventListener("change", (e) => {
  if (e.target.checked) {
    hamburgerMenuDialog.open = true;
    document.body.style = "overflow: hidden";
  } else {
    hamburgerMenuDialog.open = false;
    document.body.style = "overflow: auto";
  }
});
