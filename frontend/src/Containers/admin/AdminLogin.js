import React from 'react'
import '../../Containers/user/Login.css';
import { Link } from 'react-router-dom';
function AdminLogin() {
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 'style={{ backgroundColor: '#EFD3B5'}}>
    <div className='form_container p-5 rounded bg-white'>
      <form>
        <h3 className='text-center'>Admin Login</h3>
        <div className='mb-3'>
          <input type="email" placeholder='Enter Email' className='form-control' />
        </div>
        <div className='mb-3'>
          <input type="password" placeholder='Enter password' className='form-control' />
        </div>
        <div className='d-grid'>
          <button className='btn btn-primary mb-3'>Sign In</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin