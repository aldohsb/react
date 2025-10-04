import React, { useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import useLocalStorage from './hooks/useLocalStorage';
import { generateId } from './utils/helpers';

/**
 * App Component - Main Component
 * Mengelola state utama aplikasi dan orchestrate semua child components
 * 
 * Teknik React yang digunakan:
 * 1. useState - untuk state management (editNote)
 * 2. Custom Hook (useLocalStorage) - untuk persist data
 * 3. Component Composition - merakit komponen-komponen kecil
 * 4. Props Drilling - passing data dan functions ke child components
 * 5. Controlled Components - form handling
 * 6. Conditional Rendering - tampilkan/sembunyikan UI
 */
function App() {
  // Custom hook useLocalStorage untuk menyimpan notes di localStorage
  // Ini menggantikan useState biasa + useEffect untuk localStorage
  // Parameter: ('notes', []) -> key di localStorage dan initial value (array kosong)
  const [notes, setNotes] = useLocalStorage('notes', []);
  
  // State untuk menyimpan note yang sedang diedit
  // null = tidak ada note yang sedang diedit (create mode)
  // object = ada note yang sedang diedit (edit mode)
  const [editNote, setEditNote] = useState(null);

  /**
   * Handler untuk menambah note baru
   * @param {object} noteData - Object dengan properties title dan content
   */
  const handleAddNote = (noteData) => {
    // Buat object note baru dengan ID dan timestamp
    const newNote = {
      id: generateId(), // Generate unique ID
      title: noteData.title,
      content: noteData.content,
      createdAt: Date.now() // Timestamp saat note dibuat
    };
    
    // Update state notes dengan menambahkan note baru di awal array
    // Spread operator (...) untuk copy array lama dan tambah element baru
    // [newNote, ...notes] = note baru di depan (newest first)
    setNotes([newNote, ...notes]);
  };

  /**
   * Handler untuk update note yang sudah ada
   * @param {object} noteData - Object dengan properties title dan content
   */
  const handleUpdateNote = (noteData) => {
    // Map through semua notes dan update note yang sesuai dengan editNote.id
    const updatedNotes = notes.map((note) => {
      // Jika ID cocok dengan editNote, return note yang sudah diupdate
      if (note.id === editNote.id) {
        return {
          ...note, // Spread existing properties (id, createdAt tetap sama)
          title: noteData.title, // Update title baru
          content: noteData.content, // Update content baru
          updatedAt: Date.now() // Tambah timestamp update (optional)
        };
      }
      // Jika ID tidak cocok, return note tanpa perubahan
      return note;
    });
    
    // Update state dengan array notes yang baru
    setNotes(updatedNotes);
    
    // Reset editNote ke null (keluar dari edit mode)
    setEditNote(null);
  };

  /**
   * Handler untuk delete note
   * @param {string} noteId - ID dari note yang akan dihapus
   */
  const handleDeleteNote = (noteId) => {
    // Filter notes: ambil semua notes kecuali yang ID-nya sama dengan noteId
    // filter() return array baru yang hanya berisi element yang pass test
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    
    // Update state dengan array yang sudah difilter
    setNotes(filteredNotes);
    
    // Jika note yang dihapus adalah note yang sedang diedit,
    // reset editNote ke null
    if (editNote?.id === noteId) {
      setEditNote(null);
    }
  };

  /**
   * Handler untuk masuk ke edit mode
   * @param {object} note - Note object yang akan diedit
   */
  const handleEditNote = (note) => {
    // Set editNote dengan note yang dipilih
    // Ini akan mengubah NoteForm ke edit mode
    setEditNote(note);
    
    // Scroll ke atas agar user bisa lihat form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handler untuk cancel edit mode
   */
  const handleCancelEdit = () => {
    // Reset editNote ke null untuk kembali ke create mode
    setEditNote(null);
  };

  /**
   * Handler untuk form submission
   * Menentukan apakah ini create atau update based on editNote
   * @param {object} noteData - Data dari form
   */
  const handleFormSubmit = (noteData) => {
    // Jika editNote ada (tidak null), berarti edit mode
    if (editNote) {
      handleUpdateNote(noteData);
    } else {
      // Jika editNote null, berarti create mode
      handleAddNote(noteData);
    }
  };

  return (
    // Main container dengan min-height full screen dan background gradient
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header component dengan props noteCount */}
      <Header noteCount={notes.length} />
      
      {/* Main content container dengan max-width dan padding */}
      <main className="max-w-4xl px-4 pb-12 mx-auto">
        {/* 
          NoteForm component
          Props:
          - onSubmit: function untuk handle form submission
          - editNote: data note yang sedang diedit (null jika create mode)
          - onCancelEdit: function untuk cancel edit
        */}
        <NoteForm 
          onSubmit={handleFormSubmit}
          editNote={editNote}
          onCancelEdit={handleCancelEdit}
        />
        
        {/* 
          NoteList component
          Props:
          - notes: array of all notes
          - onEdit: function untuk handle edit button
          - onDelete: function untuk handle delete button
        */}
        <NoteList 
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </main>
    </div>
  );
}

export default App;