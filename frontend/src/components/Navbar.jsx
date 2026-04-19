import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import UserMenu from './UserMenu';
import Cart from './Cart';

const Navbar = ({ setIsNavOpen }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-8 flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex-1 flex items-center">
        <Link
          to="/"
          className="transition-transform hover:scale-105 flex items-center gap-3 md:gap-4"
        >
          <img src="/images/logo.png" alt="Urban Requisite Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
        </Link>
      </div>

      {/* Center: Inline Navigation (Desktop Only) */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-10 text-xs font-bold tracking-[0.2em] uppercase text-zinc-300 whitespace-nowrap">
        <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <Link to="/collections" className="hover:text-yellow-400 transition-colors">Collections</Link>
        <a href="#footer" className="hover:text-yellow-400 transition-colors">Contact Us</a>
        <Link to="/our-story" className="hover:text-yellow-400 transition-colors">Our Story</Link>
      </div>

      {/* Right Side: Icons & Hamburger */}
      <div className="flex-1 flex items-center justify-end gap-5 md:gap-6 relative">

        {/* Search */}
        <Search />

        {/* User / Account */}
        <UserMenu />

        {/* Cart Sidebar */}
        <Cart />

        {/* Hamburger Menu (Mobile Only) */}
        <button onClick={() => setIsNavOpen(true)} className="md:hidden text-yellow-400 hover:opacity-80 transition-opacity" aria-label="Menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
