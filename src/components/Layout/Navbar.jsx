import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-purple-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://technirvana.com.np/techlogo.webp"
            alt="Tech Nirvana Logo"
            className="w-8 h-8 object-contain bg-gray-50"
          />
          <span className="text-xl font-bold">Tech Nirvana</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/blogs"
            className="hover:text-gray-300 transition duration-200"
          >
            Blogs
          </Link>
          {user ? (
            <>
              <Link
                to="/create-blog"
                className="hover:text-gray-300 transition duration-200"
              >
                Create Blog
              </Link>
              <Link
                to="/profile"
                className="hover:text-gray-300 transition duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 bg-purple-700 rounded hover:bg-purple-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-gray-300 transition duration-200"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
