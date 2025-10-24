let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = localStorage.getItem('lang') || 'ar';
let currentCurrency = localStorage.getItem('currency') || 'SAR';

const productsContainer = document.getElementById('productsContainer');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');

// بارگذاری محصولات از JSON
async function loadProducts() {
  const res = await fetch('products.json');
  products = await res.json();
  renderProducts();
}

// رندر محصولات
function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const price = product.price[currentCurrency];
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name[currentLang]}">
      <h3>${product.name[currentLang]}</h3>
      <p>قیمت: ${price} ${currentCurrency}</p>
      <button class="add-cart" onclick="addToCart(${product.id})">افزودن به سبد خرید</button>
    `;
    productsContainer.appendChild(div);
  });
}

// مدیریت سبد خرید
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if(!product) return;
  const existing = cart.find(item => item.id === productId);
  if(existing) existing.qty +=1;
  else cart.push({id: productId, qty:1});
  saveCart();
  alert('محصول به سبد خرید اضافه شد!');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// محاسبه تخفیف بر اساس تعداد
function calculateDiscount(totalQty) {
  if(totalQty >=50) return 0.2;
  if(totalQty >=10) return 0.1;
  return 0;
}

function updateCartUI() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  let totalQty = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const price = product.price[currentCurrency];
    total += price * item.qty;
    totalQty += item.qty;

    const div = document.createElement('div');
    div.innerHTML = `${product.name[currentLang]} x ${item.qty} = ${price*item.qty} ${currentCurrency} 
                     <button onclick="removeFromCart(${item.id})">حذف</button>`;
    cartItemsDiv.appendChild(div);
  });

  const discount = calculateDiscount(totalQty);
  const discountedTotal = total * (1 - discount);

  cartTotalDiv.innerText = `جمع کل: ${discountedTotal.toFixed(2)} ${currentCurrency} ${discount>0 ? `(تخفیف ${discount*100}%)` : ''}`;
}

// تغییر زبان
document.getElementById('langSelect').addEventListener('change', e=>{
  currentLang = e.target.value;
  localStorage.setItem('lang', currentLang);
  renderProducts();
  updateCartUI();
});

// تغییر واحد پول
document.getElementById('currencySelect').addEventListener('change', e=>{
  currentCurrency = e.target.value;
  localStorage.setItem('currency', currentCurrency);
  renderProducts();
  updateCartUI();
});

// شروع
loadProducts();
updateCartUI();
