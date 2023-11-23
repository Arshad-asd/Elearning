import React from "react";

function SubscriptionDetails() {
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          {/* card stating below */}
          <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
              <div className="font-bold text-lg mb-2">Medium Subscription</div>
              <ul className="list-disc pl-4 text-sm text-gray-700">
                <li>Watch all lessons</li>
                <li>Practice workouts</li>
                <li>Live class access</li>
                <li>Lifetime access</li>
              </ul>
            </div>
            <div className="px-4 py-2">
              <div className="text-gray-700 text-sm">
                <p>Expires on: 01/01/2024</p>
                <p>Purchase Amount: $999</p>
              </div>
            </div>
            <div className="px-2 py-2 flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
