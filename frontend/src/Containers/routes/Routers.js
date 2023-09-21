import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../user/Home'
import AdminDashboard from '../admin/AdminDashboard'
import TutorDashboard from '../tutor/TutorDashboard'
import Login from '../user/Login'
import Register from '../user/Register'

const Routers = () => {
  return (
    <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/" element={<Home />}/>

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/tutor" element={<TutorDashboard />} />

    </Routes>
  )
}

export default Routers