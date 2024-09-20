const formId = document.getElementById('loginForm')
formId.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    fetch('/auth/login',{
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
    })
    .then(res => res.json())
    .then(res =>{
        console.log(res);
        if(res.success){
           setTimeout(()=>{
            window.location.href='/user/profile'
           },1000)
        }
    })
    .catch(e => console.log(e))
})