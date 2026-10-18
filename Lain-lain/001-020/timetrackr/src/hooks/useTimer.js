/**
 * Custom Hook: useTimer
 * 
 * Mengapa Custom Hook?
 * - Encapsulate logic timer yang kompleks
 * - Reusable di berbagai komponen
 * - Memisahkan business logic dari UI
 * - Lebih mudah di-test
 * 
 * Hook ini mengelola:
 * - Countdown timer logic
 * - Start/pause/reset functionality
 * - Auto-stop ketika waktu habis
 */

import { useReducer, useEffect, useRef } from 'react';
import { timerReducer, initialTimerState, TIMER_ACTIONS } from '../reducers/timerReducer';

/**
 * Custom hook untuk timer countdown
 * @returns {object} State dan functions untuk control timer
 */
export const useTimer = () => {
  // useReducer untuk manajemen state yang kompleks
  // Lebih baik dari useState karena ada banyak actions dan state transitions
  const [state, dispatch] = useReducer(timerReducer, initialTimerState);
  
  // useRef untuk menyimpan interval ID
  // useRef dipakai karena tidak perlu trigger re-render saat berubah
  // Dan nilainya persist antar render
  const intervalRef = useRef(null);

  /**
   * Function untuk set durasi timer
   * @param {number} minutes - Durasi dalam menit
   */
  const setDuration = (minutes) => {
    // Convert menit ke milliseconds (1 menit = 60,000 ms)
    const milliseconds = minutes * 60 * 1000;
    
    // Dispatch action SET_DURATION dengan payload milliseconds
    dispatch({
      type: TIMER_ACTIONS.SET_DURATION,
      payload: milliseconds
    });
  };

  /**
   * Function untuk start timer
   */
  const start = () => {
    // Hanya bisa start jika ada duration yang di-set
    if (state.timeLeft > 0) {
      dispatch({ type: TIMER_ACTIONS.START });
    }
  };

  /**
   * Function untuk pause timer
   */
  const pause = () => {
    dispatch({ type: TIMER_ACTIONS.PAUSE });
  };

  /**
   * Function untuk reset timer
   */
  const reset = () => {
    dispatch({ type: TIMER_ACTIONS.RESET });
  };

  // useEffect untuk handle interval timer
  useEffect(() => {
    // Jika timer sedang running, buat interval
    if (state.isRunning) {
      // setInterval akan dipanggil setiap 10ms
      intervalRef.current = setInterval(() => {
        // Dispatch TICK action untuk update timeLeft
        dispatch({ type: TIMER_ACTIONS.TICK });
      }, 10); // Update setiap 10ms untuk animasi smooth
    } else {
      // Jika tidak running, clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function - dipanggil saat component unmount atau dependencies berubah
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning]); // Dependencies: jalankan effect ketika isRunning berubah

  // Return state dan functions untuk digunakan di component
  return {
    // State
    timeLeft: state.timeLeft,
    isRunning: state.isRunning,
    isFinished: state.isFinished,
    duration: state.duration,
    
    // Functions
    setDuration,
    start,
    pause,
    reset
  };
};