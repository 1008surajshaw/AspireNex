import {Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from './components/hero/Navbar'
import Home from './pages/Home'
import Tech from "./components/tech/Tech";
import Project from "./components/project/Project";
import Contact from "./components/contact/Contact";



function App() {
  

  return (
    <div className="w-screen min-h-screen  flex flex-col font-inter overflow-y-hidden">
      
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/project" element={<Tech/>}/>
         <Route path="/tech" element={<Project/>}/>
         <Route path="/contact" element={<Contact/>}/>
      </Routes>
      
       
    </div>
  )
}

export default App
