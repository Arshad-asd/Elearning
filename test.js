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