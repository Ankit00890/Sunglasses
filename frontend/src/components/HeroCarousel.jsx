import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: '/images/slide1.png',
    label: 'SUMMER DROP',
    title: 'DEFIANT\nVISION',
    description: 'Brutalism meets luxury. Our frames are forged for those who see beyond the standard. No rules, just clarity.',
  },
  {
    id: 2,
    image: '/images/slide2.png',
    label: 'NEW ARRIVALS',
    title: 'ELEVATE\nAESTHETIC',
    description: 'Pushing boundaries with striking silhouettes. Redefine your perspective with our latest collection.',
  },
  {
    id: 3,
    image: '/images/slide3.png',
    label: 'LIMITED EDITION',
    title: 'URBAN\nARMOR',
    description: 'Engineered for the bold. Experience unparalleled design and uncompromising quality.',
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image - Now Clickable */}
          <Link to="/collections" className="absolute inset-0 w-full h-full cursor-pointer">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-[75%_center] md:object-[85%_center] lg:object-right"
            />
            {/* Dramatic Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 from-20% via-black/40 via-50% to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          </Link>

          {/* Slide Content */}
          <div className="absolute z-10 bottom-6 md:bottom-12 left-6 md:left-12 lg:left-24 w-full">
            <div className="max-w-lg lg:max-w-xl xl:max-w-2xl pr-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-yellow-400 text-[10px] md:text-md font-bold tracking-[0.2em] mb-1 md:mb-4"
              >
                {slides[currentSlide].label}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-3xl leading-[0.9] md:text-7xl lg:text-[7.5rem] font-black italic text-zinc-100 mt-1 tracking-tighter mb-2 md:mb-6 whitespace-pre-line drop-shadow-2xl"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-zinc-300 text-xs md:text-lg max-w-[15rem] md:max-w-md mb-4 md:mb-10 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-row md:flex-row gap-3 md:gap-4"
              >
                <Link to="/collections" className="px-4 py-2 md:px-8 md:py-4 bg-yellow-400 hover:bg-yellow-500 text-black text-[10px] md:text-sm font-bold tracking-widest transition-colors w-max flex items-center justify-center">
                  SHOP
                </Link>
                <a href="#footer" className="px-4 py-2 md:px-8 md:py-4 bg-transparent border border-zinc-600 hover:border-zinc-300 text-white text-[10px] md:text-sm font-bold tracking-widest transition-colors w-max flex items-center justify-center">
                  CONTACT US
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-10 left-8 md:left-24 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-500 ${index === currentSlide ? 'w-12 bg-yellow-400' : 'w-6 bg-zinc-600 hover:bg-zinc-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default HeroCarousel;
