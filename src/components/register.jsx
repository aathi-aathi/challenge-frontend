import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../api";
const Register = () =>{
const navigate = useNavigate()
const [isChecked,setIsChecked]= useState(false)
const [passType,setPassType] =useState('password')
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [rePassword,setRePassword]=useState('')
const [passwordError,setPasswordError]=useState('')
const [existError,setExistError] = useState('')
const [loading,setLoading] = useState(false)
const handleCheck= (e)=>{
    setIsChecked(e.target.checked)
    if(e.target.checked){
        setPassType('text')
    }else{
        setExistError('')
        setPassType('password')
    }
}
const handleSubmit = async(e)=>{
    e.preventDefault()
    if(password === rePassword){
        setLoading(true)
       const data =  await postData({name,email,password})
        setLoading(false)
        if(data.code == 1){
            setPasswordError('')
            setExistError('User already exist!')
        }else{
            navigate('/login')
        }
    }else{
        setPasswordError("Password doesn't match")
    }
    
}
    return(
        <div className="flex justify-center items-center h-screen bg-[url('./assets/heart-background.jpg')] bg-cover">
        <div className="rounded-3xl h-fit w-11/12 max-w-96 flex flex-col justify-center items-center bg-pink-200 shadow-lg" >
            <h1 className="text-3xl font-black text-pink-600 mt-2">WELCOME !</h1>
            {existError && <p className="font-bold text-red-700">{existError}</p>}
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border rounded block w-full h-9 mt-4 mb-4
                 placeholder:italic
                placeholder:text-pink-400
                text-pink-600"
                 type="text" placeholder="Enter your Name..." required/>
            </label>
            <label>
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-4
                 placeholder:italic
                 placeholder:text-pink-400
                 text-pink-600"
                 type="email" placeholder="Enter your Email..." required/>
            </label>
            <label>
                 <input 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-4
                 placeholder:italic
                 placeholder:text-pink-400
                 text-pink-600"
                 
                 type={passType} placeholder="Create your Password..." required/>
            </label>
            <label>
                 <input 
                 value={rePassword}
                 onChange={(e)=>setRePassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-2
                 placeholder:italic
                  placeholder:text-pink-400
                  text-pink-600"
                 type={passType} placeholder="Confirm your Password..." required/>
                 {passwordError && <p className="text-sm text-red-700">{passwordError}</p>}
            </label>
            <div className="flex justify-between  mb-4">
                <label className="flex gap-1"><input type='checkbox' checked={isChecked} onChange={handleCheck} className="cursor-pointer accent-pink-500"/>
                <span className="text-sm text-slate-500">Show Password</span></label>
            </div>
           
            <button className="flex justify-center bg-pink-600 rounded w-full p-2 text-white hover:bg-pink-700 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-pink-500 rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Signup'}
            </button> 
 
            </form>
            <p className="text-sm mb-2">Already have an account?<Link className="text-sm text-pink-700" to='/login'>login</Link></p>
        </div>
        </div>
    )
}
export default Register;