import React from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import TheVault from '../components/TheVault';
import QuoteSection from '../components/QuoteSection';

const Home = ({ setIsNavOpen }) => {
  return (
    <>
      {/* HERO SECTION WRAPPER */}
      <div className="relative w-full h-screen overflow-hidden">
        <Navbar setIsNavOpen={setIsNavOpen} />
        <HeroCarousel />
      </div>

      <TheVault />
      <QuoteSection />
    </>
  );
};

export default Home;
