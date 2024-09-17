const formId = document.getElementById('registerForm')
console.log(formId)
formId.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  //peticiones locales/mismo_servidor no hace falta el puerto
  fetch('/session/register',{
      method: 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email,password})
    })
  .then(res => {
    console.log(res);
    if(res.ok){
      setTimeout(()=>{
        window.location.href = '/login'
      },1000)
    }
  })
  .catch(error => console.log(error))
})
