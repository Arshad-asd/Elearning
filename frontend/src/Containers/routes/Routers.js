import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../user/Home'
import AdminDashboard from '../admin/AdminDashboard'
import TutorDashboard from '../tutor/TutorDashboard'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/tutor" element={<TutorDashboard />} />

    </Routes>
  )
}

export default Routers