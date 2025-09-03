import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ tasks }) {
  const getTaskDates = () => {
    return [...new Set(tasks.map(task => task.date).filter(date => date))];
  };

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <Calendar 
        tileClassName={({ date }) => {
          const dateStr = date.toISOString().split('T')[0];
          return getTaskDates().includes(dateStr) ? 'bg-blue-100' : null;
        }}
      />
    </div>
  );
}

export default CalendarView;