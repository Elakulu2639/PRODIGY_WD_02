import React from 'react';
import './LapList.css';

/**
 * LapList component for displaying recorded lap times
 * @param {Array<number>} laps - Array of lap times in milliseconds
 */
function LapList({ laps }) {
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

  /**
   * Calculate the interval between laps
   * @param {number} index - Index of the current lap
   * @returns {number} Interval time in milliseconds
   */
  const getLapInterval = (index) => {
    if (index === 0) return laps[0];
    return laps[index] - laps[index - 1];
  };

  return (
    <div className="lap-list-glass">
      <h2>Lap Times</h2>
      {laps.length === 0 ? (
        <p className="no-laps">No laps recorded</p>
      ) : (
        <ul>
          {laps.map((lap, index) => (
            <li key={lap} className="lap-item-glass lap-slide-in">
              <span className="lap-number">Lap {index + 1}</span>
              <span className="lap-interval">+{formatTime(getLapInterval(index))}</span>
              <span className="lap-time">{formatTime(lap)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LapList; 