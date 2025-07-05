import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('/')}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-indigo-700">StudiFy</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => handleNav('/features')} className="text-gray-700 hover:text-indigo-600 font-medium transition">Features</button>
        <button onClick={() => handleNav('/about')} className="text-gray-700 hover:text-indigo-600 font-medium transition">About Us</button>
        <button onClick={() => handleNav('/contact')} className="text-gray-700 hover:text-indigo-600 font-medium transition">Contact Us</button>
        <div className="flex gap-3 ml-4">
          <button onClick={() => handleNav('/login')} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">Login</button>
          <button onClick={() => handleNav('/signup')} className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-50 transition">Sign Up</button>
        </div>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)} className="text-gray-700 hover:text-indigo-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Slide-in Sidebar Menu (Mobile) */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          ></div>

          {/* Side Panel */}
          <div className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white z-50 p-6 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-indigo-700">StudiFy</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={() => handleNav('/features')} className="text-left text-gray-800 hover:text-indigo-600 font-medium">Features</button>
              <button onClick={() => handleNav('/about')} className="text-left text-gray-800 hover:text-indigo-600 font-medium">About Us</button>
              <button onClick={() => handleNav('/contact')} className="text-left text-gray-800 hover:text-indigo-600 font-medium">Contact Us</button>
              <hr className="border-t my-2" />
              <button onClick={() => handleNav('/login')} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">Login</button>
              <button onClick={() => handleNav('/signup')} className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-50 transition">Sign Up</button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Header;
