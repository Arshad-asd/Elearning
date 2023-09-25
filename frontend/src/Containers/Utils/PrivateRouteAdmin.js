import {Outlet,Navigate} from 'react-router-dom'
import React from 'react'

function PrivateRouteAdmin() {
  return (
    admin? <Outlet/>:<Navigate to='/admin'/>
  )
}

export default PrivateRouteAdmin