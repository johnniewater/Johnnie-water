
// مدیریت سبد خرید ساده با localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productName, price) {
  const existing = cart.find(item => item.name === productName);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({name: productName, price: price, qty:1});
  }
  saveCart();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  saveCart();
}

function updateCartUI() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if(!cartContainer) return;
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} x ${item.qty} = ${item.price*item.qty} تومان
                     <button onclick="removeFromCart('${item.name}')">حذف</button>`;
    cartContainer.appendChild(div);
  });
  cartTotal.innerText = `جمع کل: ${total} تومان`;
}

// اضافه کردن دکمه‌ها
document.addEventListener('DOMContentLoaded', ()=>{
  const addBtns = document.querySelectorAll('.add-cart');
  addBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const product = btn.parentElement;
      const name = product.querySelector('h3').innerText;
      const priceText = product.querySelector('p').innerText;
      const price = parseInt(priceText.replace(/[^0-9]/g,''));
      addToCart(name, price);
      alert('محصول به سبد خرید اضافه شد!');
    });
  });
  updateCartUI();
});
