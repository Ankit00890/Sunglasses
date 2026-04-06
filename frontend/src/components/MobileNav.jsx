import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileNav = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center px-12"
        >
          <button
            onClick={() => setIsNavOpen(false)}
            className="absolute top-6 left-6 text-yellow-400 hover:opacity-80 transition-opacity"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col space-y-8 text-4xl md:text-7xl font-black italic tracking-tighter self-center text-center">
            <Link to="/" onClick={() => setIsNavOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors uppercase">Home</Link>
            <Link to="/collections" onClick={() => setIsNavOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors uppercase">Collections</Link>
            <Link to="/lookbook" onClick={() => setIsNavOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors uppercase">Lookbook</Link>
            <Link to="/our-story" onClick={() => setIsNavOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors uppercase">Our Story</Link>
          </div>

          <div className="absolute bottom-12 left-0 w-full flex justify-center space-x-8 text-zinc-500 text-sm tracking-widest uppercase">
            <span className="hover:text-yellow-400 cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-yellow-400 cursor-pointer transition-colors">Twitter</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
