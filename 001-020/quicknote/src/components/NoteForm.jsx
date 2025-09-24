// src/components/NoteForm.jsx
import React, { useState } from 'react';
import './NoteForm.css'; // Import file CSS untuk styling

const NoteForm = ({ onAddNote }) => {
  // State untuk mengelola input judul dan konten
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Handle saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!title.trim() || !content.trim()) {
      return; // Jangan submit jika input kosong
    }
    // Panggil fungsi onAddNote dari parent dengan data catatan baru
    onAddNote({
      id: Date.now(), // ID unik menggunakan timestamp
      title: title.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(), // Waktu pembuatan
    });
    // Reset form setelah submit
    setTitle('');
    setContent('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Judul Catatan"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update state saat input berubah
        className="form-input"
        required
      />
      <textarea
        placeholder="Isi catatanmu..."
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update state saat textarea berubah
        className="form-textarea"
        rows="4"
        required
      ></textarea>
      <button type="submit" className="form-button">
        Tambah Catatan
      </button>
    </form>
  );
};

export default NoteForm;