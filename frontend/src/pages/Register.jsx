import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Registration successful!');
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      
      // FALLBACK: Simulate registration locally if backend is down
      const mockUser = {
        _id: Date.now(),
        name,
        email,
        phone,
        role: 'user',
        token: 'mock_token_' + Date.now()
      };
      
      // Store user for the "Simulation Login" to find it later
      const simulatedUsers = JSON.parse(localStorage.getItem('simulated_users') || '[]');
      localStorage.setItem('simulated_users', JSON.stringify([...simulatedUsers, { email, password, data: mockUser }]));
      
      localStorage.setItem('userToken', mockUser.token);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      
      toast.success('Quick Join: Registration successful (Simulation Mode)');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 pt-24 pb-12">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
        <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase text-center">
          Register
        </h2>
        <p className="text-[10px] font-bold tracking-widest text-zinc-500 mb-8 text-center uppercase">
          Join the exclusive club
        </p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 mb-6 text-sm font-bold tracking-widest uppercase rounded-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">WhatsApp Number</label>
            <input 
              type="tel" 
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="your@email.com"
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
            className="w-full bg-transparent border border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-black font-black uppercase tracking-widest py-4 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-yellow-400 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
