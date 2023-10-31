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
    <div className="course-carde-containers">
      {courses.map((course) => (
        <div key={course.id} className="carde">
          <div className="carde-image"></div>
          <p className="carde-title">{course.title}</p>
          <p className="carde-body">{course.description}</p>
          {/* Additional card content */}
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
