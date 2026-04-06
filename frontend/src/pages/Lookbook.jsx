import React from 'react';
import Navbar from '../components/Navbar';

const Lookbook = ({ setIsNavOpen }) => {
  return (
    <div className="relative w-full min-h-screen bg-zinc-950 flex justify-center items-center">
      <Navbar setIsNavOpen={setIsNavOpen} />
      <h1 className="text-4xl md:text-6xl font-black italic text-zinc-500 uppercase">Lookbook - Coming Soon</h1>
    </div>
  );
};

export default Lookbook;
