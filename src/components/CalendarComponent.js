import React, { useEffect, useState } from 'react';
import '../App.css';

const CalendarComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const days = [
    { name: 'Sunday', delivery: '', reminder: 'Remember to prepare Brakes delivery - Deadline before 5:00 PM' },
    { name: 'Monday', delivery: 'Brakes Delivery' },
    { name: 'Tuesday', delivery: '', reminder: 'Remember to prepare Brakes delivery - Deadline before 5:00 PM' },
    { name: 'Wednesday', delivery: 'Brakes Delivery' },
    { name: 'Thursday', delivery: '', reminder: 'Remember to prepare Brakes & Urban delivery - Deadline before 5:00 PM' },
    { name: 'Friday', delivery: 'Brakes + Urban Delivery' },
    { name: 'Saturday', delivery: '' },
  ];

  const todayIndex = currentTime.getDay();
  const todayDay = days[todayIndex];

  return (
    <div className="calendar-container">
      <h3>Brakes & Urban Delivery Calendar</h3>
      <p><strong>Today:</strong> {currentTime.toLocaleDateString('en-GB')} at {currentTime.toLocaleTimeString()}</p>
      <ul className="delivery-list">
        {days.map((day, index) => (
          <li key={day.name}>
            <strong>{day.name}:</strong>{' '}
            <span
              style={{
                color: index === todayIndex && day.delivery ? 'red' : 'inherit',
                fontWeight: day.reminder ? 'bold' : 'normal'
              }}
            >
              {day.delivery || day.reminder || 'No Delivery'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;