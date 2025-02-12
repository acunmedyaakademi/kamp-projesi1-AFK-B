import { data, myCart, formatPrice, saveCart } from "./global.js";

const checkoutSummary = document.querySelector('.checkout-summary')



let total = 0;
myCart.forEach(item => {
  total += item.price * item.count;
});
const shipping = 50;
const vat = total * 0.2;

checkoutSummary.innerHTML = '<h2>SUMMARY</h2>'
checkoutSummary.innerHTML += myCart.map(item => `
  <div class="checkout-item">
    <div class="checkout-product-detail">
        <img src=${item.image.desktop} />
      <div>
        <h3>${item.name}</h3>
        <p>$ ${formatPrice.format(item.price).substring(1)}</p>
      </div>
    </div>
    <p>x${item.count}</p>
  </div>
  `).join('');

checkoutSummary.innerHTML += `
   <div class="pay-details">
        <p>Total</p>
        <h6>$${formatPrice.format(total).substring(1)}</h6>
      </div>
      <div class="pay-details">
        <p>Shipping</p>
        <h6>$${formatPrice.format(shipping).substring(1)}</h6>
      </div>
      <div class="pay-details">
        <p>VAT (included)</p>
        <h6>$${formatPrice.format(vat).substring(1)}</h6>
      </div>
      <div class="grand-total">
        <p>Grand Total</p>
        <h6>$${formatPrice.format(total + shipping + vat).substring(1)}</h6>
      </div>
    <button class="btn" type='submit'>Continue & Pay</button>
    <dialog class="order-confirmation-dialog">
      <img src="/assets/checkout/icon-order-confirmation.svg" alt="" />
      <h2>THANK YOU FOR YOUR ORDER</h2>
      <h6>You will receive an email confirmation shortly.</h6>
      <div class="dialog-content">
        <div class="dialog-product">
          <div class="dialog-item">
            <div class="dialog-product-detail">
              <img src="${myCart[0].image.desktop}" alt="" />
              <div>
                <h3>${myCart[0].name}</h3>
                <p>${formatPrice.format(myCart[0].price).substring(1)}</p>
              </div>
            </div>
            <p>x${myCart[0].count}</p>
          </div>
          ${myCart.length > 1 ? `<h3>and ${myCart.length - 1} other item(s)</h3>` : ''}
        </div>
        <div class="dialog-pay-details">
          <p>Grand Total</p>
          <h6>$${formatPrice.format(total + shipping + vat).substring(1)}</h6>
        </div>
      </div>
      <button type='button' class="return-home-btn">Back to Home</button>
    </dialog>`

const dialog = document.querySelector('.order-confirmation-dialog')

// form.addEventListener("onSubmit", () => {
//   dialog.showModal();

// })

document.querySelector('.return-home-btn').addEventListener('click', () => {

  myCart.length = 0;
  saveCart();
  location.href = '/';
})

const form = document.querySelector('.product-detail form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  dialog.showModal();
  console.log('submitted')

})




