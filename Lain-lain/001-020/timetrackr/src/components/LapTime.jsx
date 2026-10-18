/**
 * LapTime Component
 * 
 * Komponen untuk menampilkan daftar lap times dari stopwatch
 * Menampilkan lap number, waktu lap, dan split time
 * 
 * Props:
 * - laps: array of lap objects
 */

import { getFormattedTime } from '../utils/timeFormatter';
import { Flag } from 'lucide-react';

const LapTime = ({ laps }) => {
  // Jika tidak ada laps, tidak tampilkan komponen
  if (laps.length === 0) {
    return null;
  }

  /**
   * Calculate split time (selisih waktu antar lap)
   * @param {number} index - Index lap saat ini
   * @returns {number} Split time dalam milliseconds
   */
  const calculateSplitTime = (index) => {
    // Lap pertama: split time = waktu lap itu sendiri
    if (index === 0) {
      return laps[0].time;
    }
    
    // Lap berikutnya: split time = waktu lap ini - waktu lap sebelumnya
    return laps[index].time - laps[index - 1].time;
  };

  // Find fastest and slowest lap untuk highlighting
  const splitTimes = laps.map((_, index) => calculateSplitTime(index));
  const fastestSplit = Math.min(...splitTimes);
  const slowestSplit = Math.max(...splitTimes);

  return (
    // Container untuk lap times
    <div className="w-full max-w-2xl mx-auto mt-8">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Flag className="w-5 h-5 text-yellow-400" />
        <h3 className="text-xl font-bold text-gray-100">Lap Times</h3>
        <span className="text-sm text-gray-400">({laps.length} laps)</span>
      </div>

      {/* Lap list container dengan scroll */}
      <div className="overflow-y-auto border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700 max-h-96 custom-scrollbar">
        
        {/* Table header */}
        <div className="sticky top-0 grid grid-cols-3 gap-4 px-6 py-3 text-sm font-semibold text-gray-300 border-b bg-slate-900/90 backdrop-blur-sm border-slate-700">
          <div className="text-left">Lap</div>
          <div className="text-center">Split Time</div>
          <div className="text-right">Total Time</div>
        </div>

        {/* Lap items - reverse untuk menampilkan lap terbaru di atas */}
        {[...laps].reverse().map((lap, reversedIndex) => {
          // Hitung index asli dari lap (karena array di-reverse)
          const originalIndex = laps.length - 1 - reversedIndex;
          const splitTime = calculateSplitTime(originalIndex);
          
          // Determine jika lap ini fastest atau slowest
          const isFastest = splitTime === fastestSplit && laps.length > 1;
          const isSlowest = splitTime === slowestSplit && laps.length > 1;

          return (
            <div
              key={lap.id}
              className={`px-6 py-4 border-b border-slate-700/50 last:border-b-0
                         grid grid-cols-3 gap-4 items-center hover:bg-slate-700/30 
                         transition-colors duration-200 ${
                           isFastest ? 'bg-emerald-500/10' : 
                           isSlowest ? 'bg-red-500/10' : ''
                         }`}
            >
              {/* Lap number */}
              <div className="text-left">
                <span className="font-semibold text-gray-300">
                  #{lap.lapNumber}
                </span>
              </div>

              {/* Split time dengan badge untuk fastest/slowest */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className={`font-mono text-sm ${
                    isFastest ? 'text-emerald-400 font-bold' : 
                    isSlowest ? 'text-red-400 font-bold' : 
                    'text-gray-300'
                  }`}>
                    {getFormattedTime(splitTime)}
                  </span>
                  
                  {/* Badge untuk fastest lap */}
                  {isFastest && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500 
                                   rounded text-emerald-400 text-xs font-semibold">
                      Fastest
                    </span>
                  )}
                  
                  {/* Badge untuk slowest lap */}
                  {isSlowest && (
                    <span className="px-2 py-0.5 bg-red-500/20 border border-red-500 
                                   rounded text-red-400 text-xs font-semibold">
                      Slowest
                    </span>
                  )}
                </div>
              </div>

              {/* Total time */}
              <div className="text-right">
                <span className="font-mono text-sm text-gray-400">
                  {getFormattedTime(lap.time)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LapTime;