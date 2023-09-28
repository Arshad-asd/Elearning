// AdminSidebar.js
import React, { useState } from 'react';
import '../../Components/Sidebar/AdminSidebar.css';
import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt } from 'react-icons/fa';

function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };

  return (
    <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
      <div className="toggle-button" onClick={toggleIconsOnly}>
        {isIconsOnly ? '☰' : '✖'}
      </div>
      <ul>
        <li>
        <FaHome className="sidebar-icon" />
          <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
        </li>
        <li>
          <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
          <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
        </li>
        <li>
          <FaChalkboardTeacher className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
          <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Tutor Management</span>
        </li>
        <li>
          <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
          <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
        </li>
        <li>
          <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
          <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Subscription</span>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
