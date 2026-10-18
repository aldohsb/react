// src/context/MoodContext.jsx

// Import React dan hooks yang diperlukan
import { createContext, useState, useEffect } from 'react';

// Buat Context untuk Mood
// Context ini akan menyimpan state mood dan fungsi untuk mengubahnya
export const MoodContext = createContext();

// Definisi mood yang tersedia dengan warna neon dark theme
const MOODS = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    // CSS variables untuk tema happy (kuning/oranye neon)
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500',
      glow: '#FFD700',
      background: '#0a0a0a',
      cardBg: '#1a1a1a'
    }
  },
  calm: {
    name: 'Calm',
    emoji: '😌',
    // CSS variables untuk tema calm (biru/cyan neon)
    colors: {
      primary: '#00D9FF',
      secondary: '#0099CC',
      glow: '#00D9FF',
      background: '#0a0a0a',
      cardBg: '#1a1a1a'
    }
  },
  energetic: {
    name: 'Energetic',
    emoji: '⚡',
    // CSS variables untuk tema energetic (pink/magenta neon)
    colors: {
      primary: '#FF006E',
      secondary: '#FF1493',
      glow: '#FF006E',
      background: '#0a0a0a',
      cardBg: '#1a1a1a'
    }
  },
  focused: {
    name: 'Focused',
    emoji: '🎯',
    // CSS variables untuk tema focused (hijau neon)
    colors: {
      primary: '#39FF14',
      secondary: '#00FF00',
      glow: '#39FF14',
      background: '#0a0a0a',
      cardBg: '#1a1a1a'
    }
  },
  creative: {
    name: 'Creative',
    emoji: '🎨',
    // CSS variables untuk tema creative (ungu neon)
    colors: {
      primary: '#BF40BF',
      secondary: '#9D00FF',
      glow: '#BF40BF',
      background: '#0a0a0a',
      cardBg: '#1a1a1a'
    }
  }
};

// Provider Component
// Component ini akan membungkus seluruh aplikasi dan menyediakan Context
export function MoodProvider({ children }) {
  // State untuk menyimpan mood yang sedang aktif
  // Default mood adalah 'calm'
  const [currentMood, setCurrentMood] = useState('calm');

  // useEffect untuk mengubah CSS variables setiap kali mood berubah
  useEffect(() => {
    // Ambil objek colors dari mood yang sedang aktif
    const colors = MOODS[currentMood].colors;
    
    // Ambil root element (html element)
    const root = document.documentElement;
    
    // Set setiap CSS variable ke root element
    // Ini akan mengubah tema secara global
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-glow', colors.glow);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-card-bg', colors.cardBg);
  }, [currentMood]); // Effect akan run setiap currentMood berubah

  // Fungsi untuk mengubah mood
  const changeMood = (moodKey) => {
    setCurrentMood(moodKey);
  };

  // Value yang akan dibagikan ke seluruh aplikasi melalui Context
  const contextValue = {
    currentMood,           // Mood yang sedang aktif
    changeMood,            // Fungsi untuk mengubah mood
    moods: MOODS,          // Objek berisi semua mood yang tersedia
    currentMoodData: MOODS[currentMood] // Data lengkap mood yang aktif
  };

  // Return Provider component dengan value yang sudah didefinisikan
  return (
    <MoodContext.Provider value={contextValue}>
      {children}
    </MoodContext.Provider>
  );
}