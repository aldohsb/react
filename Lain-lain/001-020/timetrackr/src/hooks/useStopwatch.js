/**
 * Custom Hook: useStopwatch
 * 
 * Mengelola logic stopwatch dengan fitur:
 * - Count up timer
 * - Lap times recording
 * - Start/pause/reset functionality
 * 
 * Sama seperti useTimer, tapi menghitung naik bukan turun
 */

import { useReducer, useEffect, useRef } from 'react';
import { stopwatchReducer, initialStopwatchState, STOPWATCH_ACTIONS } from '../reducers/stopwatchReducer';

/**
 * Custom hook untuk stopwatch
 * @returns {object} State dan functions untuk control stopwatch
 */
export const useStopwatch = () => {
  // useReducer untuk complex state management
  const [state, dispatch] = useReducer(stopwatchReducer, initialStopwatchState);
  
  // useRef untuk menyimpan interval ID tanpa trigger re-render
  const intervalRef = useRef(null);

  /**
   * Function untuk start stopwatch
   */
  const start = () => {
    dispatch({ type: STOPWATCH_ACTIONS.START });
  };

  /**
   * Function untuk pause stopwatch
   */
  const pause = () => {
    dispatch({ type: STOPWATCH_ACTIONS.PAUSE });
  };

  /**
   * Function untuk reset stopwatch
   */
  const reset = () => {
    dispatch({ type: STOPWATCH_ACTIONS.RESET });
  };

  /**
   * Function untuk record lap time
   * Hanya bisa record lap jika stopwatch sedang berjalan
   */
  const addLap = () => {
    // Validasi: hanya bisa add lap jika stopwatch running dan time > 0
    if (state.isRunning && state.time > 0) {
      dispatch({ type: STOPWATCH_ACTIONS.ADD_LAP });
    }
  };

  // useEffect untuk handle interval stopwatch
  useEffect(() => {
    if (state.isRunning) {
      // Buat interval untuk update time setiap 10ms
      intervalRef.current = setInterval(() => {
        // Dispatch TICK action untuk increment time
        dispatch({ type: STOPWATCH_ACTIONS.TICK });
      }, 10); // Update setiap 10ms untuk smooth animation
    } else {
      // Clear interval jika tidak running
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning]); // Re-run effect ketika isRunning berubah

  // Return state dan functions
  return {
    // State
    time: state.time,
    isRunning: state.isRunning,
    laps: state.laps,
    
    // Functions
    start,
    pause,
    reset,
    addLap
  };
};