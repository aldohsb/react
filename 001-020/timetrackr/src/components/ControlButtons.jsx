/**
 * ControlButtons Component
 * 
 * Komponen reusable untuk tombol kontrol (Start, Pause, Reset)
 * Menerima functions sebagai props untuk maksimal flexibility
 * 
 * Props:
 * - isRunning: boolean status running
 * - onStart: function untuk start
 * - onPause: function untuk pause
 * - onReset: function untuk reset
 * - disabled: boolean untuk disable semua tombol
 */

import { Play, Pause, RotateCcw } from 'lucide-react';

const ControlButtons = ({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset,
  disabled = false 
}) => {
  return (
    // Container dengan flex layout
    <div className="flex items-center justify-center gap-4">
      
      {/* Tombol Start/Pause - toggle berdasarkan isRunning */}
      {!isRunning ? (
        // Tombol Start
        <button
          onClick={onStart}
          disabled={disabled}
          className="relative px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-2">
            {/* Icon Play dari lucide-react */}
            <Play className="w-5 h-5" fill="currentColor" />
            <span>Start</span>
          </div>
          
          {/* Efek glow saat hover */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:opacity-20 blur-xl" />
        </button>
      ) : (
        // Tombol Pause
        <button
          onClick={onPause}
          className="relative px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl hover:shadow-amber-500/50 hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-2">
            {/* Icon Pause dari lucide-react */}
            <Pause className="w-5 h-5" fill="currentColor" />
            <span>Pause</span>
          </div>
          
          {/* Efek glow saat hover */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 group-hover:opacity-20 blur-xl" />
        </button>
      )}

      {/* Tombol Reset */}
      <button
        onClick={onReset}
        disabled={disabled}
        className="relative px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-xl hover:shadow-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg hover:scale-105 active:scale-95"
      >
        <div className="flex items-center gap-2">
          {/* Icon Reset dari lucide-react */}
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </div>
        
        {/* Efek glow saat hover */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 group-hover:opacity-20 blur-xl" />
      </button>
    </div>
  );
};

export default ControlButtons;