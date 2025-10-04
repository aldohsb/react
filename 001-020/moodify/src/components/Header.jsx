// src/components/Header.jsx

// Import useContext untuk mengakses MoodContext
import { useContext } from 'react';
import { MoodContext } from '../context/MoodContext';

export function Header() {
  // Ambil data dari MoodContext menggunakan useContext hook
  // Ini adalah cara modern untuk mengakses Context tanpa Consumer
  const { currentMoodData } = useContext(MoodContext);

  return (
    <header className="header">
      {/* Logo dengan efek neon glow */}
      <div className="logo">
        <h1 className="logo-text">
          Moodify
        </h1>
        {/* Emoji mood yang sedang aktif */}
        <span className="logo-emoji" role="img" aria-label="mood">
          {currentMoodData.emoji}
        </span>
      </div>
      
      {/* Tagline dengan efek fade */}
      <p className="tagline">
        Transform your vibe with neon themes
      </p>
    </header>
  );
}