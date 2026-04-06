import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-white hover:text-yellow-400 transition-colors"
        aria-label="Search"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full right-0 mt-4 bg-zinc-900 border border-zinc-800 p-6 w-[350px] shadow-2xl z-50 rounded-sm"
          >
            <div className="flex items-center border-b border-zinc-700 pb-2">
              <svg className="w-5 h-5 text-zinc-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="SEARCH COLLECTION..." 
                className="bg-transparent border-none outline-none text-white text-xs font-bold tracking-widest placeholder:text-zinc-600 w-full uppercase"
                autoFocus
              />
            </div>
            
            {/* Quick links block for aesthetic */}
            <div className="mt-4 flex flex-col gap-3">
               <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Trending Searches</span>
               <button className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Aviators</button>
               <button className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Summer Drop 2024</button>
               <button className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Limited Edition</button>
            </div>

            {/* Close Button overlay */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;
