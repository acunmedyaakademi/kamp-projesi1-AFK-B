import { data, formatPrice, myCart, saveCart, updateCart } from "./global.js";

const productDetailText = document.querySelector(".product-detail-text");
const productDetailItemImg = document.querySelector(".product-detail-item img");
const productFeaturesText = document.querySelector(".product-features-header p");
const productBoxItemsContent = document.querySelector(".product-box-items-content");
const productDetailImages = document.querySelector(".product-detail-images");
const productAlsoLike = document.querySelector(".product-also-like");

let id = location.hash.substring(1) || 1;
let currentData = data.find((x) => x.id == id);

function getHash() {
  id = location.hash.substring(1) || 1;
  currentData = data.find((x) => x.id == id);
  updateContent(currentData);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", getHash);

function updateContent(selectedItem) {
  let count = 1;

  productDetailItemImg.src = `${selectedItem.image.desktop}`;

  productDetailText.innerHTML = `
  ${selectedItem.isNew ? "<h4>NEW PRODUCT</h4>" : ""}
  <h3>${selectedItem.name}</h3>
  <p>${selectedItem.description}</p>
  <h3>$ ${formatPrice.format(selectedItem.price).substring(1)}</h3>
  <div class="product-detail-count-content">
    <div class="product-detail-count">
      <button class="product-detail-countDec">-</button>
      <span>${count}</span>
      <button class="product-detail-countInc">+</button>
    </div>
    <button class="add-cartBtn">ADD TO CART</button>
  </div>
  `;

  document.querySelector(".product-detail-countInc").addEventListener("click", () => {
    count++;
    document.querySelector(".product-detail-count span").innerText = count;
  });

  document.querySelector(".product-detail-countDec").addEventListener("click", () => {
    if (count > 1) {
      count--;
      document.querySelector(".product-detail-count span").innerText = count;
    }
  });

  document.querySelector(".add-cartBtn").addEventListener("click", () => {
    myCart.push({ ...selectedItem, count });
    saveCart();
    updateCart();
  });

  productFeaturesText.innerHTML = selectedItem.features;

  productBoxItemsContent.innerHTML = selectedItem.includes.map((x) => `
    <div class="product-box-item">
      <span class="product-box-item-count">${x.quantity}x</span>
      <span class="product-box-item-name">${x.item}</span>
    </div>
  `).join("");

  productDetailImages.innerHTML = selectedItem.gallery.map((x) => `
    <img src="${x.desktop}" alt="${selectedItem.name}">
  `).join("");

  productAlsoLike.innerHTML = "<h2>YOU MAY ALSO LIKE</h2>";
  productAlsoLike.innerHTML += selectedItem.others.map((x) => `
    <div class="product-also-like-item">
      <img src="${x.image.desktop}" alt="${x.name}" />
      <h3>${x.name}</h3>
      <a href="#${data.find(y => y.slug === x.slug).id}">SEE PRODUCT</a>
    </div>
  `).join("");
}

updateContent(currentData);