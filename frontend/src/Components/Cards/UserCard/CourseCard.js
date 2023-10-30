import React from 'react';
import './CourseCard.css';

const CourseCard = () => {
  // Sample data for courses
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description for Course 1' },
    { id: 2, title: 'Course 2', description: 'Description for Course 2' },
    { id: 3, title: 'Course 3', description: 'Description for Course 3' },
    // Add more courses as needed
  ];

  return (
    <div className="course-card-container">
      {courses.map((course) => (
        <div key={course.id} className="card">
          <div className="card-image"></div>
          <p className="card-title">{course.title}</p>
          <p className="card-body">{course.description}</p>
          {/* Additional card content */}
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
