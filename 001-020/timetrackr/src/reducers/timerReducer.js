/**
 * Timer Reducer - Mengelola state timer dengan useReducer
 * 
 * Konsep Reducer:
 * - Pure function yang menerima (state, action) dan return new state
 * - Tidak boleh mutate state langsung, harus return object baru
 * - Semua logika update state terpusat di satu tempat
 */

// Action types - konstanta untuk menghindari typo
export const TIMER_ACTIONS = {
  SET_DURATION: 'SET_DURATION',    // Set durasi awal timer
  START: 'START',                  // Mulai countdown
  PAUSE: 'PAUSE',                  // Pause timer
  RESET: 'RESET',                  // Reset ke durasi awal
  TICK: 'TICK'                     // Update setiap interval (10ms)
};

// Initial state untuk timer
export const initialTimerState = {
  duration: 0,           // Durasi total dalam milliseconds
  timeLeft: 0,           // Waktu tersisa dalam milliseconds
  isRunning: false,      // Status apakah timer sedang berjalan
  isFinished: false      // Status apakah timer sudah selesai
};

/**
 * Reducer function untuk timer
 * @param {object} state - State saat ini
 * @param {object} action - Action yang di-dispatch
 * @returns {object} State baru
 */
export const timerReducer = (state, action) => {
  // Switch case berdasarkan action type
  switch (action.type) {
    case TIMER_ACTIONS.SET_DURATION:
      // Set durasi timer dari input user
      return {
        ...state,
        duration: action.payload,      // Durasi baru dari payload
        timeLeft: action.payload,      // Set timeLeft sama dengan duration
        isFinished: false,             // Reset status finished
        isRunning: false               // Stop timer jika sedang berjalan
      };
    
    case TIMER_ACTIONS.START:
      // Mulai timer countdown
      return {
        ...state,
        isRunning: true,               // Set status running jadi true
        isFinished: false              // Reset status finished
      };
    
    case TIMER_ACTIONS.PAUSE:
      // Pause timer, timeLeft tetap tersimpan
      return {
        ...state,
        isRunning: false               // Set status running jadi false
      };
    
    case TIMER_ACTIONS.RESET:
      // Reset timer ke durasi awal
      return {
        ...state,
        timeLeft: state.duration,      // Kembalikan ke durasi awal
        isRunning: false,              // Stop timer
        isFinished: false              // Reset status finished
      };
    
    case TIMER_ACTIONS.TICK:
      // Update timer setiap interval
      // Kurangi timeLeft dengan interval (10ms)
      const newTimeLeft = Math.max(0, state.timeLeft - 10);
      
      return {
        ...state,
        timeLeft: newTimeLeft,
        // Jika timeLeft mencapai 0, set isFinished true dan isRunning false
        isFinished: newTimeLeft === 0,
        isRunning: newTimeLeft > 0 && state.isRunning
      };
    
    default:
      // Jika action type tidak dikenali, return state tanpa perubahan
      return state;
  }
};