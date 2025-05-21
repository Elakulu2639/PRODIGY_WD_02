# Modern Stopwatch Web Application

A beautiful, feature-rich stopwatch web application built with React. This application includes a modern glass-morphism design, dark mode support, and various user-friendly features.

## Features

1. **Time Display**
   - Precise time tracking with minutes, seconds, and milliseconds
   - Smooth animations and transitions
   - Large, easy-to-read display

2. **Core Functionality**
   - Start/Pause/Resume timer
   - Reset functionality
   - Lap time recording
   - Export lap times to CSV

3. **User Interface**
   - Modern glass-morphism design
   - Responsive layout for all screen sizes
   - Smooth animations and transitions
   - Intuitive controls

4. **Dark Mode**
   - Toggle between light and dark themes
   - Persistent theme preference
   - Automatic system theme detection

5. **Data Export**
   - Export lap times to CSV format
   - Includes lap numbers, intervals, and total times
   - Compatible with spreadsheet software

6. **Persistent State**
   - Saves timer state across page refreshes
   - Remembers lap times
   - Preserves user preferences (dark mode, sound, haptic)
   - Uses localStorage for data persistence

7. **Enhanced User Experience**
   - Sound effects for actions
   - Haptic feedback (on supported devices)
   - Keyboard shortcuts
   - Accessibility features

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Elakulu2639/PRODIGY_WD_02.git
   cd stopwatch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Controls
- Click the Start button (▶️) to begin the timer
- Click Pause (⏸️) to pause the timer
- Click Reset (🔄) to reset the timer and clear laps
- Click Lap (🏁) to record a lap time

### Keyboard Shortcuts
- Space: Start/Pause
- L: Record Lap (when running)
- Ctrl/Cmd + R: Reset
- Ctrl/Cmd + D: Toggle Dark Mode

### Settings
- 🌙/🌞: Toggle dark mode
- 🔊/🔇: Toggle sound effects
- 📳/📴: Toggle haptic feedback

### Exporting Data
- Click the "Export CSV" button to download lap times
- The CSV file includes lap numbers, intervals, and total times

## Technical Details

### Technologies Used
- React
- CSS3 (with modern features)
- Web Audio API
- Vibration API
- localStorage API

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Performance Considerations
- Uses requestAnimationFrame for smooth animations
- Efficient state management
- Minimal dependencies
- Optimized for mobile devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Glass-morphism design inspiration from modern UI trends
- Sound effects using Web Audio API
- Haptic feedback using Vibration API
