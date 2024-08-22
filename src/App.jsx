
import { useEffect, useState } from 'react'
import './App.css'
import { editData, getData} from './api'
import img from './assets/completed.png'
import crossImg from './assets/cross-image.png'
import undoImg from './assets/undo.png'
function App() {
const [items,setItems]= useState([])
const [count,setCount] = useState(0)
const getBox = async() =>{
 const data = await getData()
 setItems(data)
}
const editBox = async(id)=>{
  await editData(id,{status:'completed'})
  setCount(count+1)
}
const editNo = async(id)=>{
  await editData(id,{status:'not completed'})
  setCount(count+1)
}
const undo = async(id)=>{
  await editData(id,{status:'incompleted'})
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
      <div className='date-img'>
        {item.isCompleted=='completed' && <img className='undo-img' onClick={()=>undo(item.id)} src={undoImg}/>}
        {item.isCompleted=='not completed' && <img className='undo-img' onClick={()=>undo(item.id)} src={undoImg}/>}
      {item.isCompleted == 'completed' ? <p style={{color:'green',fontWeight:'bold'}}>{item.date}</p> :
      <p style={{color:'red',fontWeight:'bold'}}>{item.date}</p>}
      </div>
      
      <h2 style={{color: item.isCompleted == 'completed' ? 'green' :
         item.isCompleted == 'not completed' ? 'red' : 'grey' }}>DAY {item.id}</h2>
      {item.isCompleted=='not completed' && <img src={crossImg}></img>}
      {item.isCompleted=='completed' && <img src={img}></img>}
     
     {item.isCompleted == 'completed' ? <p style={{color:'green'}}>I have done it</p> 
     : item.isCompleted == 'not completed' ? <p style={{color:'red'}}>I haven't done it</p> 
    : <p><span>Are you completed ? 
    </span><span style={{color:'green',cursor:'pointer'}} onClick={()=>editBox(item.id)}>Yes</span>/
    <span style={{color:'red'}} onClick={()=>editNo(item.id)}>No</span></p>
    } 
     
    
    </div>
   )}
    </div>
    
   
    </>
  )
}

export default App
