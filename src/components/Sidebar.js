import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, User, Bell, CheckSquare, BookOpen, Share2, LogOut, Menu
} from 'lucide-react';

export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Lock scroll on mobile when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!user) return null;

  const goToProfileSection = (sectionId) => {
    if (location.pathname !== '/profile') {
      navigate(`/profile#${sectionId}`);
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-indigo-600 text-white flex justify-between items-center fixed w-full z-40">
        <h1 className="text-lg font-bold truncate">🎓 {user.name}</h1>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed z-40 top-0 left-0 w-64 min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-700 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
      >
        {/* Full-height Flexbox Layout */}
        <div className="flex flex-col h-full p-6">
          {/* Top Section */}
          <div className="mb-8 mt-6 md:mt-0">
            <h2 className="text-xl font-bold truncate">🎓 {user.name}</h2>
            <p className="text-sm text-indigo-200 truncate">{user.enrollment}</p>
            <p className="text-sm text-indigo-200 truncate">Goal: {user.branch?.name}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-grow">
            <NavItem label="Home" icon={<Home size={18} />} onClick={() => { navigate('/dashboard'); setIsOpen(false); }} />
            <NavItem label="Profile" icon={<User size={18} />} onClick={() => goToProfileSection('overview')} />
            <NavItem label="Reminders" icon={<Bell size={18} />} onClick={() => goToProfileSection('reminders')} />
            <NavItem label="To-Do List" icon={<CheckSquare size={18} />} onClick={() => goToProfileSection('todos')} />
            <NavItem label="Library" icon={<BookOpen size={18} />} onClick={() => goToProfileSection('schedule')} />
            <NavItem label="Contribute" icon={<Share2 size={18} />} onClick={() => { navigate('/contribute'); setIsOpen(false); }} />
          </nav>

          {/* Logout */}
          <div className="mt-6">
            <button
              onClick={() => { navigate('/logout'); setIsOpen(false); }}
              className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-indigo-500"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
