import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="text-white hover:text-yellow-400 transition-colors relative"
        aria-label="Cart"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          0
        </span>
      </button>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-[70] flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center text-zinc-500 pt-8">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="uppercase text-xs tracking-widest font-bold">Your cart is empty</p>
              </div>

              <div className="mt-auto border-t border-zinc-800 pt-6">
                <div className="flex justify-between items-center mb-6 text-sm font-bold tracking-widest uppercase">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-yellow-400">USD $0.00</span>
                </div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 text-xs font-black tracking-[0.2em] uppercase transition-colors">
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
