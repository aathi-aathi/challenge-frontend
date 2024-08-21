
import { useEffect, useState } from 'react'
import './App.css'
import { editData, getData } from './api'


function App() {
const [items,setItems]= useState([])
const [count,setCount] = useState(0)
const getBox = async() =>{
 const data = await getData()
 setItems(data)
}
const editBox = async(id)=>{
  await editData(id)
  setCount(count+1)
}
useEffect(()=>{
  getBox()
},[count])
  return (
    <>
    <h1>90 Days Challenge</h1>
    <div className='containter'>
      {items.map((item)=>
    <div className='box' key={item.id}>
      <p style={{color:'green',fontWeight:'bold'}}>{item.date}</p>
     <h2 style={{color: item.isCompleted && 'green'}}>DAY {item.id}</h2>
     {item.isCompleted && <img src='https://cdn-icons-png.flaticon.com/128/6785/6785304.png'></img>}
     {item.isCompleted? <p style={{color:'green'}}>I have done it</p> : 
     <p><span>Are you completed ? 
      </span><span style={{color:'green',cursor:'pointer'}} onClick={()=>editBox(item.id)}>Yes</span>/<span style={{color:'red'}}>No</span></p>}
    </div>
   )}
    </div>
    
   
    </>
  )
}

export default App
