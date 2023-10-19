// components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../Redux/slices/userSlice/loginSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import api from '../../Containers/Utils/axios';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginRequest());

    try {
      const response = await api.post('/api/token/user', {
        email,
        password,
      });

      const { userInfo, token } = response.data;

      // Save the token to local storage
      localStorage.setItem('token', token);

      dispatch(loginSuccess({ userInfo, token }));
      toast.success('Login successful!');
      console.log(response.data)
      // Navigate to another page upon successful login
      navigate('/'); // Replace '/dashboard' with the desired route
    } catch (error) {
      dispatch(loginFailure({ error: 'An error occurred during login.' }));
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#EFD3B5' }}>
      <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={handleLogin}>
          <h3 className='text-center'>Sign In</h3>
          <div className='mb-3'>
            <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <input type="password" placeholder='Enter password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='d-grid'>
            <button type="submit" className='btn btn-primary mb-3' disabled={loading}>
              Sign In
            </button>
          </div>
          <p className='text-end mt-2'>
            Forgot <a href=''>Password?</a>
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
