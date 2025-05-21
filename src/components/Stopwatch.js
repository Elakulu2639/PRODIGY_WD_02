import React, { useState, useEffect } from 'react';
import Display from './Display';
import Controls from './Controls';
import LapList from './LapList';
import './Stopwatch.css';

// Constants for localStorage keys to maintain consistency
const STORAGE_KEYS = {
  TIME: 'stopwatch_time',
  IS_RUNNING: 'stopwatch_is_running',
  LAPS: 'stopwatch_laps',
  DARK_MODE: 'stopwatch_dark_mode',
  SOUND_ENABLED: 'stopwatch_sound_enabled',
  HAPTIC_ENABLED: 'stopwatch_haptic_enabled'
};

function Stopwatch() {
  // Initialize state from localStorage or defaults
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(STORAGE_KEYS.TIME);
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  
  const [isRunning, setIsRunning] = useState(() => {
    const savedRunning = localStorage.getItem(STORAGE_KEYS.IS_RUNNING);
    return savedRunning === 'true';
  });
  
  const [laps, setLaps] = useState(() => {
    const savedLaps = localStorage.getItem(STORAGE_KEYS.LAPS);
    return savedLaps ? JSON.parse(savedLaps) : [];
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return savedDarkMode === 'true';
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return savedSound === null ? true : savedSound === 'true';
  });
  
  const [hapticEnabled, setHapticEnabled] = useState(() => {
    const savedHaptic = localStorage.getItem(STORAGE_KEYS.HAPTIC_ENABLED);
    return savedHaptic === null ? true : savedHaptic === 'true';
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIME, time.toString());
  }, [time]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_RUNNING, isRunning.toString());
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAPS, JSON.stringify(laps));
  }, [laps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode.toString());
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HAPTIC_ENABLED, hapticEnabled.toString());
  }, [hapticEnabled]);

  // Timer effect - updates time every 10ms when running
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Play a short beep sound using Web Audio API
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.15;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.13);
      o.onended = () => ctx.close();
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  // Trigger haptic feedback if supported
  const vibrate = (pattern = [80]) => {
    if (!hapticEnabled) return;
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        console.log('Vibration not supported');
      }
    }
  };

  // Event handlers for stopwatch controls
  const handleStart = () => {
    setIsRunning(true);
    playBeep();
    vibrate([50]);
  };

  const handlePause = () => {
    setIsRunning(false);
    playBeep();
    vibrate([100, 50, 100]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    playBeep();
    vibrate([120, 40, 120]);
  };

  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
    playBeep();
    vibrate([80]);
  };

  // Toggle handlers for settings
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    if (!soundEnabled) {
      playBeep();
    }
  };

  const toggleHaptic = () => {
    setHapticEnabled(prev => !prev);
    if (!hapticEnabled) {
      vibrate([50]);
    }
  };

  // Export lap times to CSV file
  const handleExportCSV = () => {
    if (laps.length === 0) return;
    let csv = 'Lap,Interval,Total Time\n';
    laps.forEach((lap, i) => {
      const interval = i === 0 ? lap : lap - laps[i - 1];
      const format = (ms) => {
        const m = String(Math.floor(ms / 60000)).padStart(2, '0');
        const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
        const ms2 = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
        return `${m}:${s}.${ms2}`;
      };
      csv += `${i + 1},+${format(interval)},${format(lap)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lap_times.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target.tagName === 'INPUT') return;

      switch (e.key.toLowerCase()) {
        case ' ': // Space bar
          e.preventDefault();
          if (isRunning) handlePause();
          else handleStart();
          break;
        case 'r':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleReset();
          }
          break;
        case 'l':
          if (isRunning) handleLap();
          break;
        case 'd':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleDarkMode();
          }
          break;
        case '?':
          setShowKeyboardShortcuts(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning]);

  return (
    <div className="stopwatch-glass-bg" role="application" aria-label="Stopwatch">
      <div className="settings-buttons">
        <button 
          className="settings-button" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        <button 
          className="settings-button" 
          onClick={toggleSound}
          aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button 
          className="settings-button" 
          onClick={toggleHaptic}
          aria-label={hapticEnabled ? "Disable haptic feedback" : "Enable haptic feedback"}
        >
          {hapticEnabled ? '📳' : '📴'}
        </button>
        <button 
          className="settings-button" 
          onClick={() => setShowKeyboardShortcuts(prev => !prev)}
          aria-label="Show keyboard shortcuts"
        >
          ⌨️
        </button>
      </div>

      {showKeyboardShortcuts && (
        <div className="keyboard-shortcuts" role="dialog" aria-label="Keyboard shortcuts">
          <h3>Keyboard Shortcuts</h3>
          <ul>
            <li><kbd>Space</kbd> - Start/Pause</li>
            <li><kbd>L</kbd> - Record Lap</li>
            <li><kbd>Ctrl/Cmd + R</kbd> - Reset</li>
            <li><kbd>Ctrl/Cmd + D</kbd> - Toggle Dark Mode</li>
            <li><kbd>?</kbd> - Show/Hide Shortcuts</li>
          </ul>
          <button 
            className="close-shortcuts"
            onClick={() => setShowKeyboardShortcuts(false)}
            aria-label="Close keyboard shortcuts"
          >
            ✕
          </button>
        </div>
      )}

      <h1 className="stopwatch-title">Stopwatch</h1>
      <Display time={time} darkMode={darkMode} />
      <Controls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onLap={handleLap}
        time={time}
        darkMode={darkMode}
      />
      <LapList laps={laps} darkMode={darkMode} />
      <button 
        className="export-btn" 
        onClick={handleExportCSV} 
        disabled={laps.length === 0}
        aria-label="Export lap times to CSV"
      >
        ⬇️ Export CSV
      </button>
    </div>
  );
}

export default Stopwatch; 