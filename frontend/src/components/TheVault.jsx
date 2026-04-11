import React from 'react';
import { Link } from 'react-router-dom';

const TheVault = () => {
  return (
    <section className="px-8 py-24 md:py-32 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col justify-between items-baseline mb-12 border-b border-zinc-800 pb-6 md:flex-row gap-6">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase relative">
          The Vault
          <span className="absolute -bottom-[25px] left-0 w-20 h-[3px] bg-yellow-400"></span>
        </h2>
        <div className="flex flex-wrap gap-6 md:gap-8 text-[11px] font-black tracking-[0.2em] uppercase mt-6 md:mt-0 items-center">
          <span className="text-yellow-400 cursor-pointer border-b px-1 border-yellow-400 pt-1 pb-[25px] shrink-0 mb-[-25px] relative z-10">Trending</span>
        </div>
      </div>

      {/* Large Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Link to="/collections" className="relative group cursor-pointer overflow-hidden bg-zinc-900 aspect-square md:aspect-auto md:h-[600px]">
          <img src="/images/slide2.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Model Campaign" />
          <div className="absolute top-8 right-8 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase shadow-lg">
            Sold Out Soon
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </Link>
        <Link to="/collections" className="relative group cursor-pointer overflow-hidden bg-zinc-900 aspect-square md:aspect-auto md:h-[600px]">
          <img src="/images/image2.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Sunset Gold" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </Link>
      </div>

      {/* Small Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <Link to="/collections" className="group cursor-pointer">
          <div className="bg-[#111] aspect-square overflow-hidden mb-4 relative flex items-center justify-center">
            <img src="/images/Nior.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Noir Classic" />
          </div>
          <div className="flex justify-between items-start px-2">
            <div>
              <h3 className="font-black text-xl italic uppercase tracking-tighter">Noir Classic</h3>
              <p className="text-zinc-500 text-[10px] tracking-widest mt-2 uppercase">Chrome / Mirror Lens</p>
            </div>
            <span className="text-yellow-400 font-bold text-sm tracking-wide pt-1">₹ 2,499</span>
          </div>
        </Link>
        {/* Card 2 */}
        <Link to="/collections" className="group cursor-pointer">
          <div className="bg-[#111] aspect-square overflow-hidden mb-4 relative flex items-center justify-center">
            <img src="/images/blue.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Azure Wave" />
          </div>
          <div className="flex justify-between items-start px-2">
            <div>
              <h3 className="font-black text-xl italic uppercase tracking-tighter">Azure Wave</h3>
              <p className="text-zinc-500 text-[10px] tracking-widest mt-2 uppercase">Deep Blue / Tint</p>
            </div>
            <span className="text-yellow-400 font-bold text-sm tracking-wide pt-1">₹ 2,899</span>
          </div>
        </Link>
        {/* Card 3 */}
        <Link to="/collections" className="group cursor-pointer text-white hover:text-white">
          <div className="bg-[#111] aspect-square overflow-hidden mb-4 relative flex items-center justify-center">
            <img src="/images/brown.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Vintage Tortoise" />
          </div>
          <div className="flex justify-between items-start px-2 text-white">
            <div>
              <h3 className="font-black text-xl italic uppercase tracking-tighter text-white">Vintage Tortoise</h3>
              <p className="text-zinc-500 text-[10px] tracking-widest mt-2 uppercase">Classic / Amber</p>
            </div>
            <span className="text-yellow-400 font-bold text-sm tracking-wide pt-1">₹ 2,599</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TheVault;
