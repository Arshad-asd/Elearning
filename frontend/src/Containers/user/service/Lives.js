import React from 'react'
import LiveCard from '../../../Components/Cards/UserCard/LiveCard'

function Lives() {
  return (
    <div className=' w-full pt-4 bg-cyan-100' style={{height:'100vh',}}>
      <div className='container grid xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
      <LiveCard/>
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