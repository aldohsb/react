// ==============================================
// ZUSTAND STORE - Global State Management
// ==============================================

import { create } from 'zustand';
import { FILTER_OPTIONS, LOCAL_STORAGE_KEY } from '../utils/constants';

/**
 * loadTasksFromStorage
 * Function helper untuk load tasks dari localStorage
 * Mengembalikan array kosong jika tidak ada data atau error
 */
const loadTasksFromStorage = () => {
  try {
    // Ambil data dari localStorage
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Parse JSON string menjadi object, return [] jika null
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    // Jika error (corrupted data), return array kosong
    console.error('Error loading tasks:', error);
    return [];
  }
};

/**
 * saveTasksToStorage
 * Function helper untuk save tasks ke localStorage
 * @param {Array} tasks - Array of task objects
 */
const saveTasksToStorage = (tasks) => {
  try {
    // Convert object ke JSON string dan simpan
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

/**
 * useTaskStore
 * Zustand store untuk mengelola state tasks dan filter
 * 
 * PELAJARAN ZUSTAND:
 * - create() membuat store dengan state dan actions
 * - set() function untuk update state
 * - get() function untuk read state saat ini
 * - Store bisa diakses dari component manapun tanpa prop drilling
 */
export const useTaskStore = create((set, get) => ({
  // ============ STATE ============
  
  /**
   * tasks: Array of task objects
   * Structure: { id, text, completed, createdAt }
   */
  tasks: loadTasksFromStorage(),
  
  /**
   * filter: Current active filter
   * Values: 'all' | 'active' | 'completed'
   */
  filter: FILTER_OPTIONS.ALL,

  // ============ ACTIONS ============

  /**
   * addTask
   * Menambahkan task baru ke list
   * @param {string} text - Text content dari task
   */
  addTask: (text) => {
    // Trim whitespace dari input
    const trimmedText = text.trim();
    
    // Validasi: jangan tambah jika text kosong
    if (!trimmedText) return;

    // Buat task object baru
    const newTask = {
      id: Date.now(), // Unique ID menggunakan timestamp
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString() // ISO string untuk timestamp
    };

    // Update state dengan task baru menggunakan functional update
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      saveTasksToStorage(updatedTasks);
      console.log('✅ Task added:', newTask.text, 'Total tasks:', updatedTasks.length);
      return { tasks: updatedTasks };
    });
  },

  /**
   * toggleTask
   * Toggle status completed dari task
   * @param {number} id - ID dari task yang akan di-toggle
   */
  toggleTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      );
      saveTasksToStorage(updatedTasks);
      console.log('✅ Task toggled:', id);
      return { tasks: updatedTasks };
    });
  },

  /**
   * deleteTask
   * Menghapus task dari list
   * @param {number} id - ID dari task yang akan dihapus
   */
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      saveTasksToStorage(updatedTasks);
      console.log('✅ Task deleted:', id, 'Remaining:', updatedTasks.length);
      return { tasks: updatedTasks };
    });
  },

  /**
   * editTask
   * Mengubah text content dari task
   * @param {number} id - ID dari task
   * @param {string} newText - Text baru
   */
  editTask: (id, newText) => {
    const trimmedText = newText.trim();
    
    if (!trimmedText) return;

    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id 
          ? { ...task, text: trimmedText }
          : task
      );
      saveTasksToStorage(updatedTasks);
      console.log('✅ Task edited:', id);
      return { tasks: updatedTasks };
    });
  },

  /**
   * setFilter
   * Mengubah filter yang aktif
   * @param {string} filter - Filter option ('all' | 'active' | 'completed')
   */
  setFilter: (filter) => {
    set({ filter });
  },

  /**
   * clearCompleted
   * Menghapus semua task yang sudah completed
   */
  clearCompleted: () => {
    set((state) => {
      // Keep hanya task yang belum completed
      const updatedTasks = state.tasks.filter((task) => !task.completed);
      
      saveTasksToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  /**
   * getFilteredTasks
   * Computed value untuk mendapatkan tasks berdasarkan filter aktif
   * @returns {Array} Filtered tasks
   */
  getFilteredTasks: () => {
    const { tasks, filter } = get();

    // Switch case berdasarkan filter
    switch (filter) {
      case FILTER_OPTIONS.ACTIVE:
        // Return hanya task yang belum completed
        return tasks.filter((task) => !task.completed);
      
      case FILTER_OPTIONS.COMPLETED:
        // Return hanya task yang sudah completed
        return tasks.filter((task) => task.completed);
      
      case FILTER_OPTIONS.ALL:
      default:
        // Return semua tasks
        return tasks;
    }
  }
}));