import React from 'react';
import './Display.css';

/**
 * Display component for showing the stopwatch time
 * @param {number} time - Time in milliseconds
 */
function Display({ time }) {
  /**
   * Format milliseconds into MM:SS.ms format
   * @param {number} timeInMs - Time in milliseconds
   * @returns {string} Formatted time string
   */
  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="display">
      {/* key prop triggers animation on time change */}
      <div className="time tick-animate" key={time}>{formatTime(time)}</div>
    </div>
  );
}

export default Display; 