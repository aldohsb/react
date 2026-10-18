/**
 * TimeDisplay Component
 * 
 * Komponen reusable untuk menampilkan waktu
 * Menerima milliseconds dan format menjadi HH:MM:SS.mm
 * 
 * Props:
 * - time: waktu dalam milliseconds
 * - isFinished: boolean untuk styling khusus ketika selesai
 */

import { formatTime, padZero } from '../utils/timeFormatter';

const TimeDisplay = ({ time, isFinished = false }) => {
  // Format waktu menggunakan utility function
  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    // Container utama dengan styling responsive
    <div className="flex items-center justify-center gap-1 font-mono">
      {/* Hours */}
      <div className="flex flex-col items-center">
        <span 
          className={`text-6xl md:text-8xl font-bold transition-colors duration-300 ${
            isFinished ? 'text-red-400' : 'text-gray-100'
          }`}
        >
          {padZero(hours)}
        </span>
        <span className="mt-1 text-xs text-gray-500">hours</span>
      </div>

      {/* Separator */}
      <span className="text-6xl font-bold text-gray-600 md:text-8xl">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <span 
          className={`text-6xl md:text-8xl font-bold transition-colors duration-300 ${
            isFinished ? 'text-red-400' : 'text-gray-100'
          }`}
        >
          {padZero(minutes)}
        </span>
        <span className="mt-1 text-xs text-gray-500">minutes</span>
      </div>

      {/* Separator */}
      <span className="text-6xl font-bold text-gray-600 md:text-8xl">:</span>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <span 
          className={`text-6xl md:text-8xl font-bold transition-colors duration-300 ${
            isFinished ? 'text-red-400' : 'text-gray-100'
          }`}
        >
          {padZero(seconds)}
        </span>
        <span className="mt-1 text-xs text-gray-500">seconds</span>
      </div>

      {/* Separator for milliseconds */}
      <span className="text-6xl font-bold text-gray-600 md:text-8xl">.</span>

      {/* Milliseconds (2 digits) */}
      <div className="flex flex-col items-center">
        <span 
          className={`text-4xl md:text-6xl font-bold transition-colors duration-300 ${
            isFinished ? 'text-red-400' : 'text-gray-400'
          }`}
        >
          {padZero(milliseconds)}
        </span>
        <span className="mt-1 text-xs text-gray-500">ms</span>
      </div>
    </div>
  );
};

export default TimeDisplay;