import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <Link
            to="/"
            className="block md:inline-block text-white px-4 py-2 md:hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="block md:inline-block text-white px-4 py-2 md:hover:bg-gray-700 rounded"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="block md:inline-block text-white px-4 py-2 md:hover:bg-gray-700 rounded"
          >
            Login
          </Link>
          <Link
            to="/admin"
            className="block md:inline-block text-white px-4 py-2 md:hover:bg-gray-700 rounded"
          >
            AdminPanel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
