import React from 'react';
import { Card, Button } from 'react-bootstrap';

const LiveCard = ({ liveClass }) => {
  const { id, title, course_name, start_time, date, status } = liveClass;

  return (
    <Card style={{ margin: '8px', backgroundColor: '#edf7f7' }}>
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text>
          <div>
            <span className="fw-bold">Subject:</span> {course_name}
          </div>
          <div style={{ color: 'green', textDecoration: 'bold' }}>
            <span className="fw-bold" style={{ color: 'black' }}>
              Time:
            </span>{' '}
            {start_time} 
          </div>
          <div>
            <span className="fw-bold">Date:</span> {date}
          </div>
          <div style={{ backgroundColor: '#09ead55e', borderRadius: '5px', color: 'red' }}>
            <span className="fw-bold">Status</span>: {status}
          </div>
        </Card.Text>
        <Button variant="dark" style={{ width: '100%' }}>
          Join Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;
