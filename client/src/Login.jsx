
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid Credentials');
      console.error(err?.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232046] via-[#4b2067] to-[#7b2ff2]">
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-white/10 border border-white/20 shadow-2xl px-8 py-10 flex flex-col items-center backdrop-blur-md" style={{minHeight: '600px'}}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7b2ff2] to-[#40c9ff] flex items-center justify-center mb-3 shadow-lg">
            {/* Building Icon */}
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white">
              <rect x="6" y="3" width="12" height="18" rx="2" fill="none" strokeWidth="2"/>
              <rect x="9" y="7" width="2" height="2" rx="0.5" fill="white"/>
              <rect x="13" y="7" width="2" height="2" rx="0.5" fill="white"/>
              <rect x="9" y="11" width="2" height="2" rx="0.5" fill="white"/>
              <rect x="13" y="11" width="2" height="2" rx="0.5" fill="white"/>
              <rect x="9" y="15" width="2" height="2" rx="0.5" fill="white"/>
              <rect x="13" y="15" width="2" height="2" rx="0.5" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-white text-center">HostelFlow</h1>
          <span className="text-sm text-gray-200 font-medium text-center">Admin Dashboard</span>
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-1">Welcome Back</h2>
          <p className="text-gray-200 text-base">Access your admin dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-bold text-white mb-1">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b2ff2] focus:border-[#7b2ff2] transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="text-left relative">
            <label htmlFor="password" className="block text-sm font-bold text-white mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b2ff2] focus:border-[#7b2ff2] transition pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.896-4.21 2.343-5.657M6.343 6.343A9.956 9.956 0 0112 2c2.21 0 4.21.896 5.657 2.343" /></svg>
              )}
            </button>
          </div>
          {error && (
            <div className="text-red-400 text-sm font-medium text-center mt-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-[#7b2ff2] to-[#40c9ff] text-white font-bold text-lg shadow-md hover:from-[#40c9ff] hover:to-[#7b2ff2] transition"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
