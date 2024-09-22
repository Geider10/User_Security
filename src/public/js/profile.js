//solo el user manda el file
const handleLoadImg = async (e)=>{
    e.preventDefault()
    const file = e.target.files[0]
    console.log(file);
    fetch('/user/img',{
        method:'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({file : file})
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            window.location.href = '/user/img'
        }
    })
    .catch(rej => console.log('error'))
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
inputFile.addEventListener('change',(e)=> handleLoadImg(e))
