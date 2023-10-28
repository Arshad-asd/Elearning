import React from 'react'
import LiveCard from '../../Components/Cards/TutorCard/LiveCard';
import { Link } from 'react-router-dom';

function Lives() {
  return (
    <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
    <div className='container'style={{paddingTop:'7rem'}}>
      {/* Header Row */}
      <div className='row '>
        <div className='col'>
        <div className='header d-flex justify-content-between align-items-center'>
            <div>
              <Link to='/live' style={{textDecoration:'none'}}>Live</Link>
            </div>
            <button className='btn btn-primary'>Add Live</button> 
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className='row mt-3'>
        <div className='col'>
          <LiveCard />
        </div>
        <div className='col'></div>
        {/* You can add more columns for additional cards */}
      </div>
    </div>
    </div>
  )
}

export default Lives