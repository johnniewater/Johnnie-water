let categories = [];
let currentCategoryId = null;

async function loadData() {
  const res = await fetch('../data/products.json');
  const data = await res.json();
  categories = data.categories || [];
  renderCategories();
  populateCategorySelect();
}

function renderCategories() {
  const container = document.getElementById('categoriesList');
  container.innerHTML = '';
  categories.forEach(cat=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${cat.name.ar} / ${cat.name.fa} / ${cat.name.en}</h3>
      <button onclick="editCategory(${cat.id})">ویرایش</button>
      <button onclick="deleteCategory(${cat.id})">حذف</button>
    `;
    container.appendChild(div);
  });
}

function populateCategorySelect() {
  const select = document.getElementById('categorySelect');
  select.innerHTML = '';
  categories.forEach(cat=>{
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name.ar;
    select.appendChild(opt);
  });
  currentCategoryId = select.value;
  renderProducts(currentCategoryId);

  select.addEventListener('change', e=>{
    currentCategoryId = parseInt(e.target.value);
    renderProducts(currentCategoryId);
  });
}

function renderProducts(categoryId) {
  const container = document.getElementById('productsList');
  container.innerHTML = '';
  const cat = categories.find(c=>c.id === parseInt(categoryId));
  if(!cat) return;
  cat.products.forEach(prod=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${prod.name.ar} / ${prod.name.fa} / ${prod.name.en}</h4>
      <img src="../${prod.image}" width="100">
      <p>حجم: ${prod.volume}</p>
      <p>قیمت USD: ${prod.price.USD}</p>
      <p>موجودی: ${prod.stock}</p>
      <button onclick="editProduct(${cat.id},${prod.id})">ویرایش</button>
      <button onclick="deleteProduct(${cat.id},${prod.id})">حذف</button>
    `;
    container.appendChild(div);
  });
}

// اضافه کردن دسته جدید
document.getElementById('addCategoryBtn').addEventListener('click', ()=>{
  const newId = categories.length ? categories[categories.length-1].id +1 : 1;
  categories.push({
    id: newId,
    name: {ar:"دسته جدید", fa:"دسته جدید", en:"New Category"},
    products: []
  });
  renderCategories();
  populateCategorySelect();
  alert('دسته جدید اضافه شد. برای ذخیره، فایل JSON بروزرسانی شود.');
});

// اضافه کردن محصول جدید
document.getElementById('addProductBtn').addEventListener('click', ()=>{
  if(categories.length===0){ alert('ابتدا یک دسته بسازید'); return;}
  const cat = categories.find(c=>c.id===parseInt(currentCategoryId));
  const newId = cat.products.length ? cat.products[cat.products.length-1].id +1 : 1;
  cat.products.push({
    id: newId,
    name: {ar:"محصول جدید", fa:"محصول جدید", en:"New Product"},
    description:{ar:"", fa:"", en:""},
    volume:"",
    price:{USD:0},
    image:"assets/products/default.jpg",
    stock:0
  });
  renderProducts(cat.id);
  alert('محصول جدید اضافه شد. برای ذخیره، JSON بروزرسانی شود.');
});

// ویرایش و حذف (نسخه اولیه بدون سرور)
function editCategory(id){ alert('برای ویرایش دسته، فایل JSON را تغییر دهید.'); }
function deleteCategory(id){ categories = categories.filter(c=>c.id!==id); renderCategories(); populateCategorySelect(); }

function editProduct(catId,prodId){ alert('برای ویرایش محصول، فایل JSON را تغییر دهید.'); }
function deleteProduct(catId,prodId){ 
  const cat = categories.find(c=>c.id===catId);
  cat.products = cat.products.filter(p=>p.id!==prodId);
  renderProducts(cat.id);
}

// شروع
loadData();
