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
    console.log(img);
}
const inputFile = document.getElementById('file-input')
inputFile.addEventListener('change',handleLoadImg)