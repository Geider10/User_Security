//solo el user manda el file, no se puede mandar files pesados
const handleLoadImg = async (e)=>{
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData(); // Usar FormData para enviar  archivos
    formData.append('avatar', file);
    fetch('/user/img',{
        method:'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            window.location.href = '/user/profile'
        }
    })
    .catch(rej => console.log('error',rej))
}
const handleEditUser = ()=>{
    const updateUser = {
        name : 'New name'
    }
    fetch('/user',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({updateUser})
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            window.location.href= '/user/profile'
        }
    })
    .catch(rej => console.log(rej))
}
const inputFile = document.getElementById('file-input')
inputFile.addEventListener('change',handleLoadImg)
