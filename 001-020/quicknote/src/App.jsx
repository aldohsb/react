// src/App.jsx
import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css'; // File CSS untuk styling App

// Komponen utama aplikasi
const App = () => {
  // Menggunakan custom hook useLocalStorage untuk menyimpan dan mengambil data catatan
  const [notes, setNotes] = useLocalStorage('notes', []);

  // Fungsi untuk menambah catatan baru
  const addNote = (newNote) => {
    // Menambahkan catatan baru ke array notes
    setNotes([newNote, ...notes]);
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = (id) => {
    // Filter array notes, buang catatan dengan id yang cocok
    setNotes(notes.filter((note) => note.id !== id));
  };
  
  // Note: Fungsi edit akan kita tambahkan di milestone berikutnya.
  const editNote = (id) => {
      // Logic untuk edit akan ditambahkan di Part 4
      console.log(`Edit catatan dengan ID: ${id}`);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>QuickNote 🚀</h1>
        <p>Aplikasi catatan sederhana dengan React dan localStorage</p>
      </header>
      <main className="app-main">
        {/* Render komponen NoteForm untuk menambahkan catatan */}
        <NoteForm onAddNote={addNote} />
        
        {/* Render komponen NoteList untuk menampilkan catatan */}
        <NoteList notes={notes} onDeleteNote={deleteNote} onEditNote={editNote} />
      </main>
    </div>
  );
};

export default App;