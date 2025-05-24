import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import '../App.css';

const Header = ({ user, onLogout, currentDateTime, stock }) => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.body.classList.contains('dark-theme')
  );
  const [liveTime, setLiveTime] = useState(new Date());

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
    setIsDarkMode(document.body.classList.contains('dark-theme'));
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      document.body.classList.add('dark-theme');
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const now = currentDateTime || new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const deliveries = {
    0: 'No Delivery',
    1: 'Brakes Delivery',
    2: 'No Delivery',
    3: 'Brakes Delivery',
    4: 'No Delivery',
    5: 'Brakes + Urban Delivery',
    6: 'No Delivery',
  };

  const todayIndex = now.getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;
  const todayDay = days[todayIndex];
  const todayDate = now.toLocaleDateString('en-GB');
  const deliveryToday = deliveries[todayIndex];
  const deliveryTomorrow = deliveries[tomorrowIndex];
  const isDelivery = deliveryToday !== 'No Delivery';

  const formattedTime = liveTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  let reminderText = '';
  if (deliveryTomorrow.includes('Brakes')) {
    reminderText += 'Remember to place Brakes order before 5:00 PM.';
  }
  if (deliveryTomorrow.includes('Urban')) {
    reminderText += (reminderText ? ' ' : '') + 'Remember to place Urban order before 5:00 PM.';
  }

  // CSV headers for export
  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Category', key: 'category' },
    { label: 'Supplier', key: 'supplier' },
    { label: 'Brakes URL', key: 'brakesUrl' },
    { label: 'Urban URL', key: 'urbanUrl' },
  ];

  return (
    <header className="header">
      <h1>Le Bon Stock</h1>
      <div className="header-info">
        <p>Welcome, {user?.username || 'Guest'}</p>
        <p>
          <strong>{todayDay}</strong>, {todayDate} | <span>{formattedTime}</span>
        </p>
        <p>
          <strong>Today's Delivery:</strong>{' '}
          <span style={{ color: isDelivery ? 'red' : 'inherit' }}>
            {deliveryToday}
          </span>
        </p>
        {reminderText && (
          <p style={{ fontWeight: 'bold', color: 'orange' }}>
            {reminderText}
          </p>
        )}
      </div>

      <div className="header-actions">
        <label className="switch" aria-label="Toggle dark mode">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider round"></span>
        </label>

        <button className="logout-button" onClick={onLogout} type="button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;