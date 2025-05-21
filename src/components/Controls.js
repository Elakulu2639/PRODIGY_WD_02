import React from 'react';
import './Controls.css';

/**
 * Controls component for stopwatch actions
 * @param {boolean} isRunning - Whether the stopwatch is running
 * @param {function} onStart - Handler for start/resume action
 * @param {function} onPause - Handler for pause action
 * @param {function} onReset - Handler for reset action
 * @param {function} onLap - Handler for lap action
 * @param {number} time - Current time in milliseconds
 */
function Controls({ isRunning, onStart, onPause, onReset, onLap, time }) {
  // Determine which button to show based on stopwatch state
  let firstButton;
  if (time === 0) {
    firstButton = (
      <button className="control-button-glass start" onClick={onStart}>
        <span role="img" aria-label="play">▶️</span> Start
      </button>
    );
  } else if (isRunning) {
    firstButton = (
      <button className="control-button-glass pause" onClick={onPause}>
        <span role="img" aria-label="pause">⏸️</span> Pause
      </button>
    );
  } else {
    firstButton = (
      <button className="control-button-glass resume" onClick={onStart}>
        <span role="img" aria-label="play">▶️</span> Resume
      </button>
    );
  }

  return (
    <div className="controls-glass">
      {firstButton}
      {/* Lap button is disabled when stopwatch is not running */}
      <button className="control-button-glass lap" onClick={onLap} disabled={!isRunning}>
        <span role="img" aria-label="flag">🏁</span> Lap
      </button>
      <button className="control-button-glass reset" onClick={onReset}>
        <span role="img" aria-label="reset">🔄</span> Reset
      </button>
    </div>
  );
}

export default Controls; 