import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { staticProducts } from '../constants/products';
import { API_ENDPOINTS, getImageUrl } from '../config';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(staticProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(API_ENDPOINTS.PRODUCTS.BASE);
          const data = await response.json();
          const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
          
          if (data && data.length > 0) {
            setProducts([...data, ...simulated]);
          } else {
            setProducts([...staticProducts, ...simulated]);
          }
        } catch (error) {
          console.error('Error fetching products for search:', error);
          const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
          setProducts([...staticProducts, ...simulated]);
        }
      };
      fetchProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSelectProduct = (product) => {
    setIsOpen(false);
    navigate('/collections');
  };

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
            className="absolute top-full right-0 mt-4 bg-[#0d0d0d] border border-zinc-800 p-6 w-[350px] shadow-2xl z-50 rounded-sm overflow-hidden"
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Results Area */}
            <div className="mt-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {filteredProducts.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id || product._id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-zinc-900/50 transition-colors rounded-sm"
                    >
                      <div className="w-12 h-12 bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-800">
                        <img 
                          src={getImageUrl(product.image)} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[10px] font-black uppercase text-zinc-100 italic tracking-tighter leading-none mb-1">{product.name}</h4>
                        <p className="text-[10px] font-bold text-yellow-400 tracking-widest">₹ {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="py-8 text-center">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">No products found</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Trending Searches</span>
                   <button onClick={() => setSearchTerm('Noir')} className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Noir</button>
                   <button onClick={() => setSearchTerm('Elite')} className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Elite</button>
                   <button onClick={() => setSearchTerm('Aviators')} className="text-left text-xs text-zinc-300 hover:text-yellow-400 font-bold uppercase tracking-wider transition-colors">Aviators</button>
                </div>
              )}
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
