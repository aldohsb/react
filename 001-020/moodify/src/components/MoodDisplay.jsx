// src/components/MoodDisplay.jsx

// Import useContext untuk mengakses Context
import { useContext } from 'react';
import { MoodContext } from '../context/MoodContext';

export function MoodDisplay() {
  // Ambil data mood yang sedang aktif dari Context
  const { currentMoodData } = useContext(MoodContext);

  // Deskripsi untuk setiap mood
  const moodDescriptions = {
    happy: 'Bright and cheerful vibes radiating positive energy all around you.',
    calm: 'Peaceful and serene atmosphere for relaxation and mindfulness.',
    energetic: 'High voltage excitement pumping through your creative flow.',
    focused: 'Sharp concentration mode for maximum productivity and clarity.',
    creative: 'Artistic inspiration flowing with unlimited imagination.'
  };

  // Ambil key mood dari data mood yang aktif
  const moodKey = Object.keys(moodDescriptions).find(
    key => currentMoodData.name.toLowerCase() === key
  );

  return (
    <div className="mood-display">
      {/* Card dengan border neon glow */}
      <div className="display-card">
        {/* Emoji besar di tengah */}
        <div className="display-emoji" role="img" aria-label="current mood">
          {currentMoodData.emoji}
        </div>

        {/* Nama mood dengan efek glow */}
        <h3 className="display-title">
          Currently: <span className="highlight">{currentMoodData.name}</span>
        </h3>

        {/* Deskripsi mood */}
        <p className="display-description">
          {moodDescriptions[moodKey]}
        </p>

        {/* Color indicators - menampilkan warna tema yang aktif */}
        <div className="color-indicators">
          <div className="color-label">Theme Colors:</div>
          <div className="color-swatches">
            {/* Primary color swatch */}
            <div 
              className="color-swatch"
              style={{ 
                backgroundColor: currentMoodData.colors.primary,
                boxShadow: `0 0 20px ${currentMoodData.colors.glow}`
              }}
              aria-label="Primary color"
            ></div>
            
            {/* Secondary color swatch */}
            <div 
              className="color-swatch"
              style={{ 
                backgroundColor: currentMoodData.colors.secondary,
                boxShadow: `0 0 15px ${currentMoodData.colors.secondary}`
              }}
              aria-label="Secondary color"
            ></div>
          </div>
        </div>

        {/* Animated pulse effect background */}
        <div className="pulse-bg" aria-hidden="true"></div>
      </div>
    </div>
  );
}