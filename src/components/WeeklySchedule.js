import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/timegrid/main.css';

const fakeClasses = [
  { title: '📐 Mathematics - Lecture', start: '2025-06-30T09:00:00', end: '2025-06-30T10:00:00', className: 'event-math' },
  { title: '🧪 Physics Lab', start: '2025-06-30T11:00:00', end: '2025-06-30T13:00:00', className: 'event-physics' },
  { title: '💻 DSA - Theory', start: '2025-07-01T10:00:00', end: '2025-07-01T11:30:00', className: 'event-dsa' },
  { title: '📘 Digital Electronics', start: '2025-07-01T14:00:00', end: '2025-07-01T15:30:00', className: 'event-de' },
  { title: '📝 Communication Skills', start: '2025-07-02T09:30:00', end: '2025-07-02T10:30:00', className: 'event-english' },
  { title: '⚙️ Microprocessors', start: '2025-07-02T12:00:00', end: '2025-07-02T13:30:00', className: 'event-micro' },
  { title: '📐 Math Tutorial', start: '2025-07-03T08:30:00', end: '2025-07-03T09:30:00', className: 'event-math' },
  { title: '💻 DSA Lab', start: '2025-07-03T10:00:00', end: '2025-07-03T12:00:00', className: 'event-dsa' },
  { title: '📘 VLSI Design', start: '2025-07-04T11:00:00', end: '2025-07-04T12:30:00', className: 'event-de' },
  { title: '⚙️ Embedded Systems', start: '2025-07-04T14:00:00', end: '2025-07-04T15:30:00', className: 'event-micro' },
  { title: '💼 Soft Skills Workshop', start: '2025-07-05T10:00:00', end: '2025-07-05T12:00:00', className: 'event-english' },
  { title: '🔬 Physics - Doubt Clearing', start: '2025-07-05T13:00:00', end: '2025-07-05T14:00:00', className: 'event-physics' },
];

export default function WeeklySchedule() {
  return (
    <section className="w-full">
      <div className="rounded-t-2xl px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <h3 className="text-2xl font-bold">📘 Weekly Class Schedule</h3>
        <p className="text-sm text-indigo-100">Plan your week ahead with clarity</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-b-2xl shadow-xl overflow-x-auto">
        <div className="min-w-[320px]">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            height="auto"
            events={fakeClasses}
          />
        </div>
      </div>
    </section>
  );
}
