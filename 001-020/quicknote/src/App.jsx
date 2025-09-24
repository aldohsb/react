// src/App.jsx
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  // State untuk menyimpan catatan yang sedang diedit
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Fungsi untuk menambah catatan baru
  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Fungsi untuk memulai proses edit
  const startEditing = (id) => {
    const note = notes.find((n) => n.id === id);
    setNoteToEdit(note);
  };

  // Fungsi untuk mengupdate catatan
  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setNoteToEdit(null); // Keluar dari mode edit setelah update
  };
  
  // Fungsi untuk membatalkan proses edit
  const cancelEditing = () => {
    setNoteToEdit(null);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>QuickNote 🚀</h1>
        <p>Aplikasi catatan sederhana dengan React dan localStorage</p>
      </header>
      <main className="app-main">
        {/* Mengirim props yang berbeda tergantung mode */}
        <NoteForm
          onAddNote={addNote}
          onUpdateNote={updateNote}
          initialNote={noteToEdit}
          onCancelEdit={cancelEditing}
        />
        <NoteList
          notes={notes}
          onDeleteNote={deleteNote}
          onEditNote={startEditing} // Mengubah nama fungsi prop agar lebih jelas
        />
      </main>
    </div>
  );
};

export default App;