import React, { useEffect, useState } from 'react';
import instance from '../../Utils/axios';
import './Plan.css';

function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Fetch plans from the API endpoint
    instance.get('/api/user/plans/') // Replace with your actual API endpoint
      .then(response => setPlans(response.data))
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  return (
    <>
      <div className="plan-container ">
        {plans.map(plan => (
          <div key={plan.type} className="columns ">
            <ul className="price" style={{ backgroundColor: plan.backgroundColor }}>
              <li className="header">{plan.type}</li>
              <li className="grey">₹ {plan.amount}</li>
              <li>
                <i className="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i>
                <span style={{ marginLeft: '8px' }}>Watch all lessons</span>
              </li>
              <li>
                <i className="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i>
                <span style={{ marginLeft: '8px' }}>Practice workouts</span>
              </li>
              <li>
                <i className="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i>
                <span style={{ marginLeft: '8px' }}>Live class access</span>
              </li>
              <li>
                {plan.type === 'Premium' ? (
                  <i className="fa fa-check" aria-hidden="true" style={{ color: '#1dff1d', marginRight: '8px' }}></i>
                ) : (
                  <i className="fa fa-times" aria-hidden="true" style={{ color: 'red', marginRight: '8px' }}></i>
                )}
                <span style={{ marginLeft: '8px' }}>Life time access</span>
              </li>
              <li className="grey"><a href="#" className="button">By now</a></li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Plan;
