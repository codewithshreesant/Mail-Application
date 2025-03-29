import React, { useState } from 'react';
import { useAdminLoginMutation } from '../features/adminApi';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLogin, { isLoading, isSuccess, isError, error }] = useAdminLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin({ email, password }).unwrap();
      console.log('Login Successful:', response);
      localStorage.setItem('token', response.token); 
      navigate('/admin/dashboard'); 
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {isError && (
              <p className="text-sm text-red-500">
                {error?.data?.message || 'Login failed. Try again.'}
              </p>
            )}
          </div>
        </form>
        {isSuccess && (
          <p className="text-sm text-green-500 mt-4">Login successful!</p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
