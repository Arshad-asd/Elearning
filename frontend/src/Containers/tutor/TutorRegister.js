import React from 'react'
import { Link } from 'react-router-dom';
import '../../Containers/user/Register.css';


function TutorRegister() {
  return (
    <div>
    <div className='signup template d-flex justify-content-center align-items-center vh-100 ' style={{ backgroundColor: '#EFD3B5' }}>
   <div className='form_container p-5 rounded bg-white'>
     <form>
       <h3 className='text-center'>Tutor SignUp</h3>
       <div className='mb-3'>
         <input type="text" placeholder='Enter username' className='form-control' />
       </div>
       <div className='mb-3'>
         <input type="email" placeholder='Enter Email' className='form-control' />
       </div>
       <div className='mb-3'>
         <input type="password" placeholder='Enter password' className='form-control' />
       </div>
       <div className='mb-3'>
         <input type="password" placeholder='Confirm Password' className='form-control' />
       </div>
       <div className='mb-2'>
         <input type='checkbox' className='custom-control custom-checkbox' id='check' />
         <label htmlFor='check' className='custom-input-label ms-2'>
           Remember me
         </label>
       </div>
       <div className='d-grid mt-2'>
         <button className='btn btn-primary mb-3'>Sign Up</button>
       </div>
       <p className='text-end mt-2'>
          <Link to='/tutor' className='ms-2'>Sign In</Link>
       </p>
     </form>
   </div>
 </div>
 </div>
  )
}

export default TutorRegister