/**
 * Stopwatch Reducer - Mengelola state stopwatch dengan useReducer
 * 
 * Perbedaan dengan Timer:
 * - Stopwatch menghitung naik (count up)
 * - Timer menghitung turun (count down)
 * - Stopwatch memiliki lap times
 */

// Action types untuk stopwatch
export const STOPWATCH_ACTIONS = {
  START: 'START',           // Mulai stopwatch
  PAUSE: 'PAUSE',           // Pause stopwatch
  RESET: 'RESET',           // Reset stopwatch ke 0
  TICK: 'TICK',             // Update setiap interval
  ADD_LAP: 'ADD_LAP'        // Tambah lap time
};

// Initial state untuk stopwatch
export const initialStopwatchState = {
  time: 0,                  // Total waktu yang sudah berjalan (ms)
  isRunning: false,         // Status running
  laps: []                  // Array untuk menyimpan lap times
};

/**
 * Reducer function untuk stopwatch
 * @param {object} state - State saat ini
 * @param {object} action - Action yang di-dispatch
 * @returns {object} State baru
 */
export const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case STOPWATCH_ACTIONS.START:
      // Mulai stopwatch
      return {
        ...state,
        isRunning: true
      };
    
    case STOPWATCH_ACTIONS.PAUSE:
      // Pause stopwatch, time tetap tersimpan
      return {
        ...state,
        isRunning: false
      };
    
    case STOPWATCH_ACTIONS.RESET:
      // Reset stopwatch ke 0 dan clear semua laps
      return {
        ...initialStopwatchState  // Kembalikan ke initial state
      };
    
    case STOPWATCH_ACTIONS.TICK:
      // Update waktu setiap interval (tambah 10ms)
      return {
        ...state,
        time: state.time + 10     // Increment time dengan 10ms
      };
    
    case STOPWATCH_ACTIONS.ADD_LAP:
      // Tambah lap time baru ke array laps
      // Lap time berisi waktu saat lap di-record
      return {
        ...state,
        laps: [
          ...state.laps,          // Spread laps yang sudah ada
          {
            id: Date.now(),       // Unique ID menggunakan timestamp
            time: state.time,     // Waktu saat lap di-record
            lapNumber: state.laps.length + 1  // Nomor lap
          }
        ]
      };
    
    default:
      return state;
  }
};