// src/components/MoodSelector.jsx

// Import useContext untuk mengakses Context
import { useContext } from 'react';
import { MoodContext } from '../context/MoodContext';

export function MoodSelector() {
  // Destructuring values dari MoodContext
  const { moods, currentMood, changeMood } = useContext(MoodContext);

  return (
    <div className="mood-selector">
      {/* Judul section */}
      <h2 className="section-title">
        Choose Your Mood
      </h2>

      {/* Grid container untuk mood buttons */}
      <div className="mood-grid">
        {/* Loop through semua mood yang tersedia */}
        {Object.keys(moods).map((moodKey) => {
          const mood = moods[moodKey];
          // Check apakah mood ini sedang aktif
          const isActive = currentMood === moodKey;

          return (
            <button
              key={moodKey}
              // Tambahkan class 'active' jika mood sedang aktif
              className={`mood-button ${isActive ? 'active' : ''}`}
              // Event handler untuk mengubah mood
              onClick={() => changeMood(moodKey)}
              // Accessibility: informasikan state button ke screen reader
              aria-pressed={isActive}
              aria-label={`Select ${mood.name} mood`}
            >
              {/* Emoji mood dengan ukuran besar */}
              <span className="mood-emoji" role="img" aria-label={mood.name}>
                {mood.emoji}
              </span>
              
              {/* Nama mood */}
              <span className="mood-name">
                {mood.name}
              </span>

              {/* Glow effect circle - hanya muncul saat active */}
              {isActive && (
                <span className="mood-glow" aria-hidden="true"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}