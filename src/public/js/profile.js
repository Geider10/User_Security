
const convertBase64 = (file)=>{
    return new Promise ((res,rej)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () =>{
            res(fileReader.result)
        }
        fileReader.onerror = (e) =>{
            rej(e)
        }
    })
}
const handleLoadImg = async (e)=>{
    e.preventDefault()
    const file = e.target.files[0]
    const img = await convertBase64(file)
    if(!img) console.error('no se seleccion ningun archivo');
    //peticion fetch para actualizar data user
    fetch('/user',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({img: 'nueva imagen', name : 'franco'})
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
