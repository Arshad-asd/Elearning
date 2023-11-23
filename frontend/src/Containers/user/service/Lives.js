import React from 'react'
import LiveCard from '../../../Components/Cards/UserCard/LiveCard'

function Lives() {
  return (
    <div className=' w-full  pt-4 bg-cyan-100' style={{height:'100vh',}}>
      <div className='container grid grid-cols-4'>
      <LiveCard />
      <LiveCard />
      <LiveCard />
      <LiveCard />
      <LiveCard />
      <LiveCard />
      </div>
    </div>
  )
}

export default Lives