// AdminSidebar.js
import React, { useState } from 'react';

import '../../Components/Sidebar/AdminSidebar.css';
import AdminHeader from '../../Components/Header/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../Redux/slices/adminSlice/adminAuthSlice';
import {adminInstance} from '../../Containers/Utils/axios';
import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'


function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };
 
  const {adminInfo}=useSelector((state)=>state.adminAuth)
  
  const dispatch=useDispatch()
   
  const handleLogout =async () => {
    try{
      const authToken = adminInfo.refresh;
      const response = await adminInstance.post('/logout/');
      dispatch(adminLogout())
      console.log(response.data)
    } catch(error){
      console.error('Logout failed', error);
    }
   
  };
  
  return (
    <>
      <AdminHeader />
     {adminInfo && adminInfo.role === 'admin' && <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
        <NavLink to='/admin/dashboard' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <FaHome className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
          </li>
        </NavLink>
        <NavLink to='/admin/usermanagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
          </li>
        </NavLink>
        <NavLink to='/admin/tutormanagemet' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  
          <li>
            <FaChalkboardTeacher className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Tutor Management</span>
          </li>
          </NavLink>
          <li>
            <HiOutlineCurrencyRupee className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Plans</span>
          </li>
          <li>
            <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
          </li>
          <li>
            <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Subscription</span>
          </li>

          {/* New li tags with corresponding icons */}
          <li>
            <FaChartBar className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Sales Report</span>
          </li>
          <li>
            <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Logout</span>
          </li>
        </ul>
      </aside> }
    </>
  );
}

export default AdminSidebar;
