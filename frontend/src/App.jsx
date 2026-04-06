import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Context
import { CartProvider } from './context/CartContext';

// Components
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import OurStory from './pages/OurStory';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="relative w-full min-h-screen bg-zinc-950 font-sans text-white overflow-x-hidden flex flex-col">
          
          {/* Global Navigation Overlay */}
          <MobileNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

          {/* Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home setIsNavOpen={setIsNavOpen} />} />
              <Route path="/collections" element={<Collections setIsNavOpen={setIsNavOpen} />} />
              <Route path="/lookbook" element={<Lookbook setIsNavOpen={setIsNavOpen} />} />
              <Route path="/our-story" element={<OurStory setIsNavOpen={setIsNavOpen} />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout setIsNavOpen={setIsNavOpen} />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
          
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
