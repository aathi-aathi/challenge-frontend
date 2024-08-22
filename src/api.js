const backendUrl = 'https://challege-backend.onrender.com'
// const backendUrl = 'http://localhost:7303'
const getData = async() =>{
    const response = await fetch(`${backendUrl}/challenge`)
    return await response.json()
}
const editData = async(id,userData)=>{
    const response = await fetch(`${backendUrl}/edit/${id}`,{
        method:'POST',
        body: JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return await response.json()
}
export {getData,editData}
