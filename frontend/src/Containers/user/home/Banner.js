import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Banner.css';

import { useEffect, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  'image/education.avif',
  'image/image2.jpg',
  'image/image3.jpg',
  // Add more image URLs as needed
];

const ImageCarousel = () => {
  const handleJoinNowClick = () => {
    // Implement the logic for the "Join Now" button click
    console.log('Join Now clicked');
  };

  const handleShowCourseClick = () => {
    // Implement the logic for the "Show Course" button click
    console.log('Show Course clicked');
  };

  return (
    <div className="banner">
      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Carousel>

      <div className="button-container">
        <button onClick={handleJoinNowClick}>Join Now</button>
        <button onClick={handleShowCourseClick}>Show Course</button>
      </div>
    </div>
  );
};

export default ImageCarousel;
