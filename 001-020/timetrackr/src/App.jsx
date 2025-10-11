/**
 * App Component - Main Application
 * 
 * Komponen root yang menampung Timer dan Stopwatch
 * Menggunakan tab navigation untuk switch antar mode
 * 
 * State Management:
 * - useState untuk active tab (simple state)
 * - Custom hooks di child components untuk complex logic
 */

import { useState } from 'react';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import { Clock, Timer as TimerIcon } from 'lucide-react';

function App() {
  // State untuk track tab yang aktif
  // 'timer' atau 'stopwatch'
  const [activeTab, setActiveTab] = useState('timer');

  return (
    // Container utama dengan gradient background
    <div className="min-h-screen px-4 py-12 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Main container */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header aplikasi */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
            TimeTrackr
          </h1>
          <p className="text-lg text-gray-400">
            Professional time tracking dashboard
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-2 border shadow-lg bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700">
            
            {/* Tab Timer */}
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold 
                       transition-all duration-300 ${
                         activeTab === 'timer'
                           ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                           : 'text-gray-400 hover:text-gray-300 hover:bg-slate-700/50'
                       }`}
            >
              <Clock className="w-5 h-5" />
              <span>Timer</span>
            </button>

            {/* Tab Stopwatch */}
            <button
              onClick={() => setActiveTab('stopwatch')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold 
                       transition-all duration-300 ${
                         activeTab === 'stopwatch'
                           ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                           : 'text-gray-400 hover:text-gray-300 hover:bg-slate-700/50'
                       }`}
            >
              <TimerIcon className="w-5 h-5" />
              <span>Stopwatch</span>
            </button>
          </div>
        </div>

        {/* Content Area - Render komponen berdasarkan active tab */}
        <main>
          {/* Conditional rendering dengan fade animation */}
          <div className="animate-fadeIn">
            {activeTab === 'timer' ? <Timer /> : <Stopwatch />}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-sm text-center text-gray-500">
          <p>Built with React, Custom Hooks & useReducer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;