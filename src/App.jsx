
import { useEffect, useState } from 'react'
import './App.css'
import { changeEditData, editData, getData, setDateData} from './api'
import img from './assets/completed.png'
import crossImg from './assets/cross-image.png'
import undoImg from './assets/undo.png'
function App() {
const [items,setItems]= useState([])
const [count,setCount] = useState(0)
const [itemCount,setItemCount]=useState(0)
const [date,setDate] =useState('')
const handleChange= async(e)=>{
  const inputDate = e.target.value;
  const id = e.target.id
  const [year,month,day]=inputDate.split('-')
  const formattedDate = `${day}/${month}/${year}`
  setDate(inputDate)
  await setDateData(id,{date:formattedDate})
  setCount(count+1)
}
const getBox = async() =>{
 const data = await getData()
 setItems(data)
 const filterItem = data.filter((item) => item.isCompleted == 'completed'  )
 setItemCount(filterItem.length)
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
const changeEditMode = async(id)=>{
  await changeEditData(id)
  setCount(count+1)
}
useEffect(()=>{
  getBox()
},[count])
  return (
    <>
    <h1>90 Days Challenge</h1>
    <h2>{itemCount}/90</h2>
    <div className='containter'>
      {items.map((item)=>
        <div className='box' key={item.id}>
          <div className='date-img'>
            {item.isCompleted=='completed' && <img className='undo-img' onClick={()=>undo(item.id)} src={undoImg}/>}
            {item.isCompleted=='not completed' && <img className='undo-img' onClick={()=>undo(item.id)} src={undoImg}/>}
            {item.isCompleted == 'completed' ? <p style={{color:'green',fontWeight:'bold'}}>{item.date}</p> :
            <p style={{color:'red',fontWeight:'bold'}}>{item.date}</p>}
            {!item.isEdit ? <button style={{padding:'3px'}} onClick={()=>changeEditMode(item.id)}>edit</button>:<input type='date' className='date-input'  id={item.id} onChange={handleChange} value={date}/>}
          </div>
      
          <h2 style={{color: item.isCompleted == 'completed' ? 'green' :
          item.isCompleted == 'not completed' ? 'red' : 'grey' }}>DAY {item.id}</h2>
          {item.isCompleted=='not completed' && <img src={crossImg}></img>}
          {item.isCompleted=='completed' && <img src={img}></img>}
     
           {item.isCompleted == 'completed' ? <p style={{color:'green'}}>I have done it</p> 
             : item.isCompleted == 'not completed' ? <p style={{color:'red'}}>I haven't done it</p> 
              : <p><span>Are you completed ? 
            </span><span style={{color:'green',cursor:'pointer'}} onClick={()=>editBox(item.id)}>Yes</span>/
            <span style={{color:'red'}} onClick={()=>editNo(item.id)}>No</span></p>} 
        </div>
      )}
    </div>
    
   
  </>
  )
}

export default App
