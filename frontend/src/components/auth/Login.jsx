import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../features/authApi';
import { saveUser } from '../slice/UserSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser({ email, password });
      if (result.data) {
        console.log("is user exist ",result?.data.data.isUserExist);
        dispatch(saveUser(result?.data.data.isUserExist));
        console.log("login response ",result);
        toast.success('Login Successful!');
        navigate('/'); 
      } else if (result.error) {
        toast.error(result.error.data.message || 'Login failed.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;