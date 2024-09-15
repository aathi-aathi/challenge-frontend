const backendUrl = 'https://challege-backend.onrender.com'
const getData = async() =>{
    const response = await fetch(`${backendUrl}/challenge`)
    return await response.json()
}
const postData =async(userData)=>{
    const response = await fetch(`${backendUrl}/user`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const userLogin =async(userData)=>{
    const response = await fetch(`${backendUrl}/login`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
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
const changeEditData = async(id)=>{
    const response = await fetch(`${backendUrl}/set-edit/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return await response.json()
}
const setDateData = async(id,userData)=>{
    const response = await fetch(`${backendUrl}/change-date/${id}`,{
        method:'POST',
        body: JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return await response.json()
}
export {postData,userLogin,getData,editData,changeEditData,setDateData}
