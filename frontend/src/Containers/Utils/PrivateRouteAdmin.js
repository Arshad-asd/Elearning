import {Outlet,Navigate} from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
function PrivateRouteAdmin() {
  const {adminInfo}=useSelector((state)=>state.adminAuth)
  return (
    adminInfo? <Outlet/>:<Navigate to='/admin' replace/>
  )
}

export default PrivateRouteAdmin