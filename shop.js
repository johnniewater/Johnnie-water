let categories = [];
let currentLang = localStorage.getItem('lang') || 'ar';
let currentCurrency = localStorage.getItem('currency') || 'SAR';

async function loadShopData() {
  const res = await fetch('data/products.json');
  const data = await res.json();
  categories = data.categories || [];
  renderShop();
}

function renderShop() {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';
  categories.forEach(cat=>{
    const catDiv = document.createElement('div');
    catDiv.className = 'category';
    catDiv.innerHTML = `<h2>${cat.name[currentLang]}</h2>`;
    cat.products.forEach(prod=>{
      const price = convertPrice(prod.price.USD);
      const prodDiv = document.createElement('div');
      prodDiv.className = 'product';
      prodDiv.innerHTML = `
        <img src="${prod.image}" alt="${prod.name[currentLang]}">
        <h3>${prod.name[currentLang]}</h3>
        <p>${prod.description[currentLang]}</p>
        <p>حجم: ${prod.volume}</p>
        <p>قیمت: ${price.toFixed(2)} ${currentCurrency}</p>
      `;
      catDiv.appendChild(prodDiv);
    });
    container.appendChild(catDiv);
  });
}

function convertPrice(usdPrice){
  const rates = {USD:1, SAR:3.75, AED:3.67, KWD:0.31};
  return usdPrice*rates[currentCurrency];
}

loadShopData();
