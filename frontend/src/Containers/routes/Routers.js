import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../user/Home'
import AdminDashboard from '../admin/AdminDashboard'
import TutorDashboard from '../tutor/TutorDashboard'
import Login from '../user/Login'
import Register from '../user/Register'
import AdminLogin from '../admin/AdminLogin'
import TutorRegister from '../tutor/TutorRegister'
import TutorLogin from '../tutor/TutorLogin'

const Routers = () => {
  return (
    <Routes>

         {/* <------- User Routes -------> */} 

        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/" element={<Home />}/>

        {/* <------- Admin Routes -------> */}
  
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* <------- Tutor Routes -------> */}

        <Route path='/tutor' element={<TutorLogin />} /> 
        <Route path='/tutor/signup' element={<TutorRegister />}/>
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />

    </Routes>
  )
}

export default Routers
