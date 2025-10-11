/**
 * Stopwatch Component
 * 
 * Komponen utama untuk stopwatch dengan lap time
 * Menggunakan custom hook useStopwatch untuk manage logic
 * 
 * Features:
 * - Count up timer
 * - Record lap times
 * - Start/Pause/Reset functionality
 */

import { useStopwatch } from '../hooks/useStopwatch';
import TimeDisplay from './TimeDisplay';
import ControlButtons from './ControlButtons';
import LapTime from './LapTime';
import { Timer, Flag } from 'lucide-react';

const Stopwatch = () => {
  // Gunakan custom hook useStopwatch
  // Hook ini return state dan functions untuk control stopwatch
  const { time, isRunning, laps, start, pause, reset, addLap } = useStopwatch();

  return (
    // Container utama
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Header dengan icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Timer className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold text-gray-100">Stopwatch</h2>
      </div>

      {/* Card container */}
      <div className="p-8 border shadow-2xl bg-slate-800/50 backdrop-blur-sm rounded-2xl border-slate-700">
        
        {/* Time Display Component */}
        <div className="mb-8">
          <TimeDisplay time={time} isFinished={false} />
        </div>

        {/* Control buttons container dengan lap button */}
        <div className="flex flex-col items-center gap-4">
          
          {/* Start/Pause/Reset Buttons */}
          <ControlButtons
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
            disabled={false}
          />

          {/* Lap Button - hanya tampil jika stopwatch running */}
          {isRunning && (
            <button
              onClick={addLap}
              className="relative px-8 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-2">
                {/* Icon Flag dari lucide-react */}
                <Flag className="w-5 h-5" />
                <span>Record Lap</span>
              </div>
              
              {/* Efek glow saat hover */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 group-hover:opacity-20 blur-xl" />
            </button>
          )}
        </div>

        {/* Info text ketika belum ada laps */}
        {time > 0 && laps.length === 0 && isRunning && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Click "Record Lap" to save lap times
            </p>
          </div>
        )}
      </div>

      {/* Lap Times Component - tampil di luar card */}
      <LapTime laps={laps} />
    </div>
  );
};

export default Stopwatch;