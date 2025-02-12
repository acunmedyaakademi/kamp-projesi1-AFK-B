import { data } from "./global.js";
const categoryTitle = document.querySelector(".category-title h1");
const productHeadphones = document.querySelector(".product-headphones");

let currentCategory = location.hash.substring(1).toLowerCase() || 'headphones';

let filterData = data.filter(x => x.category === currentCategory)

function getHash() {
  currentCategory = location.hash.substring(1).toLowerCase() || 'headphones';
  filterData = data.filter(x => x.category === currentCategory);
  updateContent(filterData);
  window.scrollTo(0,0);
}

window.addEventListener("hashchange", getHash)

function updateContent(selectedData) {
  categoryTitle.innerText = currentCategory.toUpperCase();

  productHeadphones.innerHTML = selectedData.sort((a,b) => b.isNew - a.isNew).map(x => `
      <div class="product-headphones-item">
          <img class="product-img-mobile" src="${x.categoryImage.desktop}" alt="${currentCategory}" />
          <img class="product-img-tablet" src="${x.categoryImage.tablet}" alt="${currentCategory}" />
          <div class="product-headphones-text">
            ${x.isNew ? "<h4>NEW PRODUCT</h4>" : ''}
            <h3>${x.name}</h3>
            <p>${x.description}</p>
            <a href="/assets/pages/product-detail.html#${x.id}">SEE PRODUCT</a>
          </div>
        </div>
    `).join("");
    console.log(selectedData)
    
}
updateContent(filterData);

