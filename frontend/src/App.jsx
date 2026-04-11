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
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <CartProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#18181b', // zinc-900
            color: '#fff',
            border: '1px solid #27272a', // zinc-800
            borderRadius: '0',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#facc15', 
              secondary: '#000',
            },
          },
        }}
      />
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
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
