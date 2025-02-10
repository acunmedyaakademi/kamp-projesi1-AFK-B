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
