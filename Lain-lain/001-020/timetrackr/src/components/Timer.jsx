/**
 * Timer Component
 * 
 * Komponen utama untuk countdown timer
 * Menggunakan custom hook useTimer untuk manage logic
 * 
 * Features:
 * - Set durasi timer
 * - Countdown dari durasi yang di-set
 * - Start/Pause/Reset functionality
 */

import { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import TimeDisplay from './TimeDisplay';
import ControlButtons from './ControlButtons';
import { Clock } from 'lucide-react';

const Timer = () => {
  // State lokal untuk input durasi (dalam menit)
  const [inputMinutes, setInputMinutes] = useState(5);
  
  // Gunakan custom hook useTimer
  // Hook ini return state dan functions untuk control timer
  const { timeLeft, isRunning, isFinished, duration, setDuration, start, pause, reset } = useTimer();

  /**
   * Handle perubahan input durasi
   */
  const handleInputChange = (e) => {
    // Parse value menjadi number, min 0
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setInputMinutes(value);
  };

  /**
   * Handle submit form untuk set durasi timer
   */
  const handleSetDuration = (e) => {
    e.preventDefault(); // Prevent default form submit behavior
    
    // Set durasi menggunakan function dari custom hook
    if (inputMinutes > 0) {
      setDuration(inputMinutes);
    }
  };

  return (
    // Container utama
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Header dengan icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Clock className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-100">Countdown Timer</h2>
      </div>

      {/* Card container */}
      <div className="p-8 border shadow-2xl bg-slate-800/50 backdrop-blur-sm rounded-2xl border-slate-700">
        
        {/* Form untuk set durasi - hanya tampil jika duration belum di-set */}
        {duration === 0 && (
          <form onSubmit={handleSetDuration} className="mb-8">
            <div className="flex flex-col items-center gap-4">
              <label className="font-medium text-gray-300">
                Set Timer Duration (minutes)
              </label>
              
              <div className="flex items-center gap-4">
                {/* Input number untuk durasi */}
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={inputMinutes}
                  onChange={handleInputChange}
                  className="w-32 px-4 py-3 text-xl font-semibold text-center text-white transition-all border rounded-lg bg-slate-700 border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {/* Button untuk set duration */}
                <button
                  type="submit"
                  disabled={inputMinutes === 0}
                  className="px-6 py-3 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-blue-500/50"
                >
                  Set Timer
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Display timer - hanya tampil jika duration sudah di-set */}
        {duration > 0 && (
          <>
            {/* Time Display Component */}
            <div className="mb-8">
              <TimeDisplay time={timeLeft} isFinished={isFinished} />
            </div>

            {/* Indikator jika timer selesai */}
            {isFinished && (
              <div className="mb-6 text-center">
                <span className="inline-block px-6 py-2 font-semibold text-red-400 border border-red-500 rounded-full bg-red-500/20 animate-pulse">
                  ⏰ Time's Up!
                </span>
              </div>
            )}

            {/* Control Buttons Component */}
            <ControlButtons
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onReset={reset}
              disabled={false}
            />

            {/* Button untuk kembali ke set duration */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  reset();
                  setDuration(0);
                }}
                className="text-sm text-gray-400 underline transition-colors duration-200 hover:text-gray-300"
              >
                Change Duration
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;