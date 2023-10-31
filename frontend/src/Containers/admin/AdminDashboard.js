import React from "react";
import "../../Containers/admin/AdminDashboard.css";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
function AdminDashboard() {
  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
        <div className="container" style={{ paddingTop: "7rem" }}>
          {/* Header Row */}
          <div className="row ">
            <div className="col">
              <div className="header d-flex justify-content-between align-items-center">
                <div className="link-container">
                  <Link
                    to="/live"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Dashboard
                  </Link>
                </div>
                {/* <button className='btn btn-primary'>Add Live</button>  */}
              </div>
            </div>
          </div>

          {/* Cards Row */}
          <div className="row mt-3">
            <div className="col"></div>
            <div className="col"></div>
            {/* You can add more columns for additional cards */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
