import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="block text-white hover:text-yellow-400 transition-colors"
        aria-label="Account"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible backdrop to close dropdown when clicking outside */}
            <div 
              className="fixed inset-0 z-40 bg-transparent" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full right-0 mt-4 bg-zinc-900 border border-zinc-800 w-[280px] shadow-2xl z-50 rounded-sm flex flex-col"
            >
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-2">My Account</h3>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">Login to access the vault</p>
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 text-[10px] font-black tracking-widest uppercase transition-colors text-center inline-block">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent border border-zinc-700 hover:border-yellow-400 text-white hover:text-yellow-400 transition-colors py-2.5 text-[10px] font-black tracking-widest uppercase text-center inline-block">
                    Register
                  </Link>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-4 bg-zinc-950/50">
                <button className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center justify-between group">
                  Orders 
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
                </button>
                <button className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center justify-between group">
                  Wishlist 
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
                </button>
                <button className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center justify-between group">
                  Support 
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
                </button>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-left text-xs font-bold uppercase tracking-wider text-yellow-600 hover:text-yellow-400 transition-colors flex items-center justify-between group mt-2 pt-2 border-t border-zinc-800/50">
                  Admin Login 
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserMenu;
