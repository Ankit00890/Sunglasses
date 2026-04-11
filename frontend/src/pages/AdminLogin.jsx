import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the admin token to local storage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminInfo', JSON.stringify(data));
        // We'll redirect to a dashboard later, for now just a toast will do
        toast.success('Admin login successful!');
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      
      // FALLBACK: If server is down, check credentials locally for development/testing
      if (email === 'admin@gmail.com' && password === 'lokesh@12398') {
        const mockData = {
          token: 'mock_token_for_testing',
          name: 'Admin User',
          email: 'admin@gmail.com'
        };
        localStorage.setItem('adminToken', mockData.token);
        localStorage.setItem('adminInfo', JSON.stringify(mockData));
        toast.success('Quick Access: Logging in via Simulation Mode');
        navigate('/admin/dashboard');
      } else {
        setError('Cannot connect to the server');
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 pt-24">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
        <h2 className="text-3xl font-black italic tracking-tighter text-yellow-400 mb-6 uppercase text-center">
          Admin Login
        </h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 mb-6 text-sm font-bold tracking-widest uppercase rounded-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest py-4 transition-colors"
          >
            Access Vault
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
