import React from 'react'
import './Plan.css';
function Plan() {
  return (
    <>
    <div className="plan-container">
    <div class="columns">
  <ul class="price">
    <li class="header" style={{ backgroundColor: '#70df91'}}>Basic</li>
    <li class="grey">Free / 1 month</li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Watch all lessons</span></li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Practice workouts</span></li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Live class access</span></li>
    <li> <i class="fa fa-times" aria-hidden="true" style={{ color: 'red', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Life time access</span></li>
    
    <li class="grey"><a href="#" class="button">Sign Up</a></li>
  </ul>
</div>
<div class="columns">
  <ul class="price">
    <li class="header" style={{ backgroundColor: '#84ff67'}}>Medium</li>
    <li class="grey">₹ 999/ year</li>
    <li > <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Watch all lessons</span></li>
    <li > <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Practice workouts</span></li>
    <li > <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Live class access</span></li>
    <li > <i class="fa fa-times" aria-hidden="true" style={{ color: 'red', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Life time access</span></li>
    <li class="grey"><a href="#" class="button">Sign Up</a></li>
  </ul>
</div>
<div class="columns">
  <ul class="price">
    <li class="header" style={{ backgroundColor: '#d7ff74'}}>Premium</li>
    <li class="grey">₹ 1999/ Unlimited</li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Watch all lessons</span></li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Practice workouts</span></li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Live class access</span></li>
    <li> <i class="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i><span style={{  marginLeft: '8px' }}>Life time access</span></li>
    <li class="grey"><a href="#" class="button">Sign Up</a></li>
  </ul>
</div>
</div>
    </>
  )
}

export default Plan