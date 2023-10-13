import React from 'react';

function Home() {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '300px', // Adjust the height as needed
          background: 'url("path/to/your/banner-image.jpg")', // Replace with the path to your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content inside the banner, if needed */}
        <h1 style={{ color: '#fff', textAlign: 'center', paddingTop: '100px' }}>
          Welcome to My Website
        </h1>
      </div>
      {/* The rest of your page content goes here */}
    </>
  );
}

export default Home;
