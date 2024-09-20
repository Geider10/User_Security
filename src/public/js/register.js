const formId = document.getElementById('registerForm')
formId.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  //peticiones locales/mismo_servidor no hace falta el puerto
  fetch('/auth/register',{
      method: 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email,password})
    })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    if(res.success){
      setTimeout(()=>{
        window.location.href = '/login'
      },1000)
    }
  })
  .catch(error => console.log(error))
})
