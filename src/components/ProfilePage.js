// src/components/ProfilePage.js

import Sidebar from './Sidebar';
import UserInfoCard from './UserInfoCard';
import AssignmentCalendar from './AssignmentCalendar';
import WeeklySchedule from './WeeklySchedule';
import RemindersPanel from './RemindersPanel';
import ThemeToggle from './ThemeToggle';
import TodoList from './TodoList';
import UserContributions from '../components/UserContributions';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';  // <-- import here

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user); // ✅ use Zustand
  const navigate = useNavigate();                    // <-- setup navigate

  if (!user) return <div className="text-center p-10 text-gray-500">⏳ Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Sidebar user={user} />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-12 scroll-smooth">

        {/* Back to Dashboard button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          ← Back to Dashboard
        </button>

        <section id="overview">
          <UserInfoCard /> {/* ✅ no props needed */}
        </section>

        <section id="calendar">
          <AssignmentCalendar />
        </section>

        <section id="schedule">
          <WeeklySchedule />
        </section>

        <section id="reminders">
          <RemindersPanel />
        </section>

        <section id="todos">
          <TodoList />
        </section>

        <section id="contribute">
          <UserContributions />
        </section>

      </main>
    </div>
  );
}
