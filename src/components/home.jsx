import { useEffect, useState } from "react";
import { changeEditData, editData, getData, setDateData } from "../api";

const Home = () =>{
const [loading,setLoading]=useState(false)
const [records,setRecords]=useState([])
const [count,setCount]=useState(0)
const getActions = async()=>{
    setLoading(true)
   const data = await getData()
   setLoading(false)
   setRecords(data) 
}
const checkFunc = async(id)=>{
    await editData(id,{status:'completed'})
    setCount(count +1)
}
const unCheckFunc = async(id)=>{
    await editData(id,{status:'incompleted'})
    setCount(count +1)
}
const changeEditFunc = async(id)=>{
    await changeEditData(id)
    setCount(count+1)
}
const handleDate = async(e) =>{
const [year,month,date]= e.target.value.split('-')
const current_date = date +'/'+month+'/'+year
await setDateData(e.target.id,{date:current_date})
setCount(count+1)
}
useEffect(()=>{
    getActions()
},[count])
if(loading){
    return (
    <div className="h-screen w-full flex justify-center items-center">
        <img className='h-16 w-16'src="https://www.icegif.com/wp-content/uploads/2023/10/icegif-293.gif"/>
    </div>
    
)}
    return(
        <div className="h-screen w-full  flex flex-col items-center  gap-1  ">
        <img className="mt-4 mb-2" src="https://cdn-icons-png.flaticon.com/128/17705/17705487.png"/>
        <div className="flex flex-col gap-4 items-center w-full">
        {records.map((record)=> (<div key={record.id} className="flex gap-2 flex-col items-center border border-sky-400 rounded h-fit w-11/12 shadow-md max-w-96 ">
        <div className="flex gap-4 justify-evenly items-center w-full mt-2">
        {record.isCompleted =='completed' ?<i
         onClick={()=>unCheckFunc(record.id)} className='fa-solid fa-circle-check fa-2xl text-sky-400'></i>
        : <i className='fa-regular fa-circle fa-2xl text-pink-500'  onClick={()=>checkFunc(record.id)}></i>}
        <h1 className="font-bold text-pink-600 text-4xl">D<span className="text-sky-400">A</span>Y-{record.id}</h1>
       {record.isEdit ?
       <input type='date' onChange={handleDate} id={record.id}/> :
       <h1 className="font-bold text-pink-600 text-xl">{record.date}</h1>}
        </div>
        {record.isCompleted =='completed' && <button onClick={()=>changeEditFunc(record.id)} className="bg-sky-400 p-2 rounded-xl text-xl text-white mb-2">Change Date</button>}
        </div>))}
        </div>
        </div>
    ) 
}
export default Home;