import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MobileNav = ({ isNavOpen, setIsNavOpen }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('adminToken');
    setIsNavOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

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
          {/* Close Button */}
          <button
            onClick={() => setIsNavOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-yellow-400 border border-white/10 transition-all active:scale-95"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col space-y-8 text-4xl md:text-7xl font-black italic tracking-tighter self-center text-center">
            <Link to="/" onClick={() => setIsNavOpen(false)} className="text-white hover:text-yellow-400 transition-colors uppercase">Home</Link>
            <Link to="/collections" onClick={() => setIsNavOpen(false)} className="text-white hover:text-yellow-400 transition-colors uppercase">Collections</Link>
            <Link to="/our-story" onClick={() => setIsNavOpen(false)} className="text-white hover:text-yellow-400 transition-colors uppercase">Our Story</Link>

            {userInfo ? (
              <div className="pt-8 border-t border-zinc-800 flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.4em] text-yellow-400 font-black mb-4">MEMBER: {userInfo.name}</span>
                <button onClick={handleLogout} className="text-2xl text-zinc-500 hover:text-white transition-colors uppercase italic">Logout</button>
              </div>
            ) : (
              <div className="pt-8 border-t border-zinc-800 flex flex-col space-y-6 items-center">
                <Link to="/login" onClick={() => setIsNavOpen(false)} className="text-2xl text-zinc-500 hover:text-yellow-400 transition-colors uppercase italic">Login</Link>
                <Link to="/register" onClick={() => setIsNavOpen(false)} className="text-2xl text-zinc-500 hover:text-yellow-400 transition-colors uppercase italic">Register</Link>
              </div>
            )}
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
