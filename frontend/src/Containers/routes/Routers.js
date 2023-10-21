import React from 'react'
import {Routes,Route} from 'react-router-dom'
import AdminDashboard from '../admin/AdminDashboard'
import TutorDashboard from '../tutor/TutorDashboard'
import Home from '../user/home/Home'
import Login from '../user/Login'
import Register from '../user/Register'
import AdminLogin from '../admin/AdminLogin'
import TutorRegister from '../tutor/TutorRegister'
import TutorLogin from '../tutor/TutorLogin'
import UserManagement from '../admin/UserManagement'
import Profile from '../user/profile/Profile'
import Plan from '../user/plan/Plan'
import Service from '../user/service/Service'
import Course from '../user/course/Course'


const Routers = () => {
  return (
    <Routes>

         {/* <------- User Routes -------> */} 

        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/" element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/plans' element={<Plan />} />
        <Route path='/service' element={<Service />} />
        <Route path='/courses' element={<Course />} />

        {/* <------- Admin Routes -------> */}
  
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/admin/usermanagement' element={<UserManagement />} />

        {/* <------- Tutor Routes -------> */}

        <Route path='/tutor' element={<TutorLogin />} /> 
        <Route path='/tutor/signup' element={<TutorRegister />}/>
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />

    </Routes>
  )
}

export default Routers
