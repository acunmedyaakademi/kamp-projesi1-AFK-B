export let data = [];
export let myCart = [];

export function saveCart() {
  localStorage.myCart = JSON.stringify(myCart);
}

export const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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

if (localStorage.myCart) {
  myCart = JSON.parse(localStorage.myCart);
} else {
  myCart = [];
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

const cartInput = document.querySelector(".cartInput");
const cartDialog = document.querySelector(".cart-dialog");

cartInput.addEventListener("change", (e) => {
  if (e.target.checked) {
    cartDialog.open = true;
    document.body.style = "overflow: hidden";
  } else {
    cartDialog.open = false;
    document.body.style = "overflow: auto";
  }
});

const cartNum = document.querySelector(".cart-header h2");
const cartItemList = document.querySelector(".cart-item-list");

export function updateCart() {
  cartNum.textContent = `CART (${myCart.length})`;
  cartItemList.innerHTML = myCart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image.mobile}" alt="${item.name}" />
      <div class="cart-item-metadata">
        <h3>${item.name}</h3>
        <p>$ ${item.price}</p>
      </div>
      <div class="cart-item-count">
        <button type="button" class="cart-item-countDec" data-id="${item.id}">-</button>
        <span>${item.count}</span>
        <button type="button" class="cart-item-countInc" data-id="${item.id}">+</button>
      </div>
    </div>
  `
    )
    .join("");

  const cartItemCountDec = document.querySelectorAll(".cart-item-countDec");
  const cartItemCountInc = document.querySelectorAll(".cart-item-countInc");

  cartItemCountDec.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const item = myCart.find((x) => x.id == id);

      if (item.count > 1) {
        item.count--;
      } else {
        myCart = myCart.filter((item) => item.id != id);
      }
      saveCart();
      updateCart();
    });
  });

  cartItemCountInc.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const item = myCart.find((x) => x.id == id);
      item.count++;
      saveCart();
      updateCart();
    });
  });

  const cartTotal = document.querySelector(".cart-total");

  let total = 0;
  myCart.map((item) => {
    total += item.price * item.count;
  });

  cartTotal.textContent = `$ ${formatPrice.format(total).substring(1)}`;
}

updateCart();

const removeAllCart = document.querySelector(".cart-header button");

removeAllCart.addEventListener("click", () => {
  myCart = [];
  saveCart();
  updateCart();
});
