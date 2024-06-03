import React, { useState, useEffect } from 'react';
import image1 from '../../../src/assest/banner/img4.jpg';
import image2 from '../../../src/assest/banner/img2.webp'; 
import image3 from '../../../src/assest/banner/img3.jpg'; 

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { src: image1, alt: 'First slide' },
    { src: image2, alt: 'Second slide' },
    { src: image3, alt: 'Third slide' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);  
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden mt-8 mb-10"> 
      <div className="flex h-96 mr-10 ml-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full transition-transform transform ${
              index === activeIndex ? 'translate-x-0' : 'translate-x-full'
            } ${index < activeIndex ? '-translate-x-full' : ''}`}
            style={{ display: index === activeIndex ? 'block' : 'none' }}
          >
            <img className="w-full h-full object-cover" src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${ 
              index === activeIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};


export default Banner;
