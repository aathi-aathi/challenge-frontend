const backendUrl = 'https://challege-backend.onrender.com'
const getData = async() =>{
    const response = await fetch(`${backendUrl}/challenge`)
    return await response.json()
}
const editData = async(id)=>{
    const response = await fetch(`${backendUrl}/edit/${id}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return await response.json()
}
export {getData,editData}
