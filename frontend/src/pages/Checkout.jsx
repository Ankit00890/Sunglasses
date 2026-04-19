import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const Checkout = ({ setIsNavOpen }) => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  // Pre-fill user data if logged in
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        name: userInfo.name || '',
        phone: userInfo.phone || ''
      }));
    }
  }, []);

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/,/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 500 ? 0 : 60;
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error('Your cart is empty!');
    
    // Format cart items for WhatsApp message
    const itemsText = cart.map(item => `${item.quantity}x ${item.name} (₹${item.price})`).join('\n');
    
    const message = `*NEW ORDER (Cash on Delivery)*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}\n\n*Order Info:*\n${itemsText}\n\nSubtotal: ₹${subtotal}\nDelivery: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}\n*Total Bill: ₹${total}*`;
    
    const waLink = `https://wa.me/917042159193?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(waLink, '_blank');
    
    // Clear cart and go home
    clearCart();
    navigate('/');
  };

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 px-6 md:px-12 lg:px-24 pt-48 lg:pt-64 pb-24 text-white">
      <Navbar setIsNavOpen={setIsNavOpen} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-2">Checkout</h1>
        <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Complete your order securely</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-[#111] p-8 rounded-2xl border border-zinc-800"
        >
          <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-zinc-800 pb-4">Delivery Address</h2>
          <form onSubmit={handleConfirmOrder} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg p-4 text-white outline-none focus:border-yellow-400 transition-colors" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg p-4 text-white outline-none focus:border-yellow-400 transition-colors" placeholder="Enter your WhatsApp number" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Detailed Address</label>
              <textarea required name="address" value={formData.address} onChange={handleInputChange} rows="3" className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg p-4 text-white outline-none focus:border-yellow-400 transition-colors resize-none" placeholder="House/Flat No., Street, Landmark"></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">City & Pincode</label>
              <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg p-4 text-white outline-none focus:border-yellow-400 transition-colors" placeholder="E.g. New Delhi, 110001" />
            </div>
            
            <button type="submit" disabled={cart.length === 0} className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-black uppercase tracking-[0.2em] py-5 rounded-lg mt-8 transition-colors flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Confirm Cash On Delivery
            </button>
          </form>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full lg:w-[400px]"
        >
          <div className="bg-[#111] p-8 rounded-2xl border border-zinc-800 sticky top-32">
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-zinc-800 pb-4">Order Summary</h2>
            
            {cart.length === 0 ? (
              <p className="text-zinc-500 mb-6">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a1a1a] p-3 rounded-lg border border-zinc-800 gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md bg-[#111]" />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-sm font-bold text-yellow-400">₹{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="sm:hidden text-zinc-600 hover:text-red-500 p-1">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <div className="flex justify-between w-full sm:w-auto items-center">
                      <div className="flex items-center gap-2 bg-black rounded border border-zinc-800 px-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-zinc-400 hover:text-white">-</button>
                        <span className="text-white text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-zinc-400 hover:text-white">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="hidden sm:block text-zinc-600 hover:text-red-500 ml-4 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-6 border-t border-zinc-800 text-sm font-bold tracking-widest uppercase">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery</span>
                <span>{cart.length === 0 ? '₹0' : deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}</span>
              </div>
              <p className="text-[10px] text-zinc-600 normal-case mb-4">*Free delivery on orders over ₹500</p>
              
              <div className="flex justify-between text-white text-lg pt-4 border-t border-zinc-800">
                <span>Total Bill</span>
                <span className="text-yellow-400 drop-shadow-md">₹{total}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
