// src/components/Clock.js
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  return (
    <div className="clock-container">
      <div className="day">{day}</div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  );
};

export default Clock;