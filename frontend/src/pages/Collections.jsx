import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { staticProducts } from '../constants/products';
import { API_ENDPOINTS, getImageUrl } from '../config';
import { toast } from 'react-hot-toast';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Collections = ({ setIsNavOpen }) => {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS.BASE);
        const data = await response.json();
        const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
        if (data && data.length > 0) {
          setProducts([...data, ...simulated]);
        } else if (simulated.length > 0) {
          setProducts([...staticProducts, ...simulated]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
        if (simulated.length > 0) {
          setProducts([...staticProducts, ...simulated]);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 px-6 md:px-12 lg:px-24 pt-32 pb-24">
      <Navbar setIsNavOpen={setIsNavOpen} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-black italic text-zinc-100 uppercase tracking-tighter mb-4">
          The Vault
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          Discover our exclusive range of premium eyewear. Uncompromising quality meets striking design.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {products.map((product) => {
          const waText = encodeURIComponent(`Hi, I'm interested in buying the ${product.name} (₹${product.price}). Is it available?`);
          const waLink = `https://wa.me/917042159193?text=${waText}`;

          return (
            <motion.div 
              key={product.id}
              variants={cardVariants}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:border-zinc-700 transition-colors duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-[#111] overflow-hidden">
                <img 
                  src={getImageUrl(product.image)} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 z-10 -mt-[4.5rem]">
                <div className="flex justify-between items-end mb-6 bg-[#0a0a0a]/90 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tight leading-none mb-1">{product.name}</h3>
                    <p className="text-yellow-400 text-sm font-bold tracking-widest mt-1">₹ {product.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-transparent border border-zinc-700 hover:border-zinc-400 text-white py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors rounded"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors rounded"
                    >
                      Buy Now
                    </button>
                  </div>
                  
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-zinc-800 hover:border-green-500/50 text-white py-3 px-4 rounded flex items-center justify-center gap-3 transition-colors group/wa"
                  >
                    <svg className="w-5 h-5 text-green-500 group-hover/wa:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <span className="text-xs font-bold tracking-widest uppercase">WhatsApp Order</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Collections;
