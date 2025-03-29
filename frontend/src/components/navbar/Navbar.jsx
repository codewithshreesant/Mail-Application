import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Send, FileText, UserPlus, LogIn, LogOut } from 'react-feather';
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../features/authApi';

const services = [
  {
    name: 'Inbox',
    path: '/',
    icon: <Mail size={20} />,
  },
  {
    name: 'Sent',
    path: '/sent',
    icon: <Send size={20} />,
  },
  {
    name: 'Drafts',
    path: '/drafts',
    icon: <FileText size={20} />,
  },
];

function Navbar() {
  const user = useSelector(state => state.user);
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {

      await logoutUser().unwrap();

      localStorage.removeItem('user');

      window.location.href = '/';
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-indigo-600 mr-4">Mail App</h1>
        </div>
        
        {/* Links */}
        <ul className="flex space-x-4">
          {services.map((ele, ind) => (
            <li key={ind}>
              <Link
                to={ele.path}
                className={`flex items-center space-x-2 p-2 rounded-md transition duration-300 ${
                  location.pathname === ele.path
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {ele.icon}
                <span>{ele.name}</span>
              </Link>
            </li>
          ))}
          {user?.user?.isAdmin ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`flex items-center space-x-2 p-2 rounded-md transition duration-300 ${
                    location.pathname === '/login'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`flex items-center space-x-2 p-2 rounded-md transition duration-300 ${
                    location.pathname === '/register'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <UserPlus size={20} />
                  <span>Signup</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
