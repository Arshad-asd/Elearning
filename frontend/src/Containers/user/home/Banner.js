import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Banner.css'

import{ useEffect, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  'image/education.avif',
  'image/image2.jpg',
  'image/image3.jpg',
  // Add more image URLs as needed
];




const ImageCarousel = () => {
  return (
    <div className="banner">
      <div style={{height:'100px'}}>

      </div>
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

</div>

  );
};

export default ImageCarousel;