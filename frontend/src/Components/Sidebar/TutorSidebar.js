import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { GrSchedulePlay } from 'react-icons/gr';
import { NavLink,useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import '../../Components/Sidebar/TutorSidebar.css';
import TutorHeader from '../Header/TutorHeader';
import { useDispatch, useSelector } from 'react-redux';

import { TutorLogout } from '../../Redux/slices/tutorSlice/tutorAuthSlice';
import { toast} from 'react-toastify';

function TutorSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };
  
  
  const handleLogout = () => {
    console.log('Logout clicked');
    showToast("logout Sucessfully",'success')
    dispatch(TutorLogout());
    navigate('/tutor')

  };

  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    });
  };
  return (
    <>
     <TutorHeader />
      {tutorInfo && tutorInfo.role === 'tutor' && <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
        <NavLink to='/tutor/dashboard' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <FaHome className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
          </li>
          </NavLink>
          <NavLink to='/tutor/lives' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <RiLiveLine className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Live class</span>
          </li>
          </NavLink>
          <li>
            <GrSchedulePlay className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Shedules</span>
          </li>
          <li>
            <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
          </li>
          <li>
            <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li>
          <NavLink to='/tutor/profile' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <FaUser className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Profile</span>
          </li>
          </NavLink>
          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Logout</span>
          </li>
        </ul>
      </aside> }
    </>
  );
}

export default TutorSidebar