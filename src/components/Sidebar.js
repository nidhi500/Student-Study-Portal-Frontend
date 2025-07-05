import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, User, Bell, CheckSquare, BookOpen, Share2, LogOut, Menu
} from 'lucide-react';

export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const goToProfileSection = (sectionId) => {
    if (location.pathname !== '/profile') {
      navigate(`/profile#${sectionId}`);
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-indigo-600 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">🎓 {user.name}</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
  className={`
    z-40 left-0 w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white p-6
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'fixed top-0 h-full translate-x-0' : 'fixed top-0 h-full -translate-x-full'} 
    md:relative md:translate-x-0 md:block md:h-auto
  `}
>

        {/* Top Section */}
        <div className="mb-8 mt-10 md:mt-0">
          <h2 className="text-xl font-bold truncate">🎓 {user.name}</h2>
          <p className="text-sm text-indigo-200 truncate">{user.enrollment}</p>
          <p className="text-sm text-indigo-200 truncate">Goal: {user.branch?.name}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavItem label="Home" icon={<Home size={18} />} onClick={() => navigate('/dashboard')} />
          <NavItem label="Profile" icon={<User size={18} />} onClick={() => goToProfileSection('overview')} />
          <NavItem label="Reminders" icon={<Bell size={18} />} onClick={() => goToProfileSection('reminders')} />
          <NavItem label="To-Do List" icon={<CheckSquare size={18} />} onClick={() => goToProfileSection('todos')} />
          <NavItem label="Library" icon={<BookOpen size={18} />} onClick={() => goToProfileSection('schedule')} />
          <NavItem label="Contribute" icon={<Share2 size={18} />} onClick={() => navigate('/contribute')} />
        </nav>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/logout')}
            className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </div>
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
