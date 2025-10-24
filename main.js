console.log("وب‌سایت آب معدنی آماده است!");

// مثال ارسال فرم تماس
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد!');
    form.reset();
  });
}

// مثال افزودن محصول به سبد خرید
const cartButtons = document.querySelectorAll('.add-cart');
cartButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    alert('محصول به سبد خرید اضافه شد!');
  });
});
