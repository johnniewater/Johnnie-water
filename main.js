console.log("وب‌سایت آب معدنی آماده است!");

// مثال فرم تماس
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد!');
    form.reset();
  });
}
