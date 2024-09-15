import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/register"
import Login from "./components/login"
import Home from "./components/home"
import ProtectedRoute from "./components/protectedRoute"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<ProtectedRoute component={<Home/>}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
