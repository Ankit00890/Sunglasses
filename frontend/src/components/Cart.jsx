import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace(/,/g, ''));
    return total + (price * item.quantity);
  }, 0);

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
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
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
              <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4 shrink-0">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center text-zinc-500 pt-8">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="uppercase text-xs tracking-widest font-bold">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-[#111] p-3 rounded-xl border border-zinc-900 shadow-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-black" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-white font-black italic uppercase tracking-tight text-sm leading-tight">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors ml-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                        <p className="text-yellow-400 font-bold text-xs tracking-widest mb-3">₹{item.price}</p>
                        
                        <div className="flex items-center gap-3 bg-black w-fit rounded border border-zinc-800">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-zinc-400 hover:text-white">-</button>
                          <span className="text-white text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-zinc-400 hover:text-white">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto border-t border-zinc-800 pt-6 shrink-0 bg-zinc-950">
                <div className="flex justify-between items-center mb-6 text-sm font-bold tracking-widest uppercase">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-yellow-400">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  disabled={cart.length === 0}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 text-xs font-black tracking-[0.2em] uppercase transition-colors"
                >
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
