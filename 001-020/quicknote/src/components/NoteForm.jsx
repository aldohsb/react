// src/components/NoteForm.jsx
import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ onAddNote, onUpdateNote, initialNote, onCancelEdit }) => {
  // State untuk mengelola input judul dan konten
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // useEffect untuk mengisi form saat ada catatan yang akan diedit
  // Hook ini akan berjalan setiap kali 'initialNote' berubah
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    } else {
      // Reset form jika tidak ada catatan yang sedang diedit
      setTitle('');
      setContent('');
    }
  }, [initialNote]);

  // Handle saat form disubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }

    if (initialNote) {
      // Jika ada initialNote, berarti kita sedang mengupdate
      onUpdateNote({
        ...initialNote,
        title: title.trim(),
        content: content.trim(),
      });
      onCancelEdit(); // Batalkan mode edit
    } else {
      // Jika tidak ada, berarti kita sedang menambah catatan baru
      onAddNote({
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        timestamp: new Date().toISOString(),
      });
    }
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
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Isi catatanmu..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-textarea"
        rows="4"
        required
      ></textarea>
      <div className="form-actions">
        {/* Mengubah teks tombol berdasarkan mode (tambah/edit) */}
        <button type="submit" className="form-button">
          {initialNote ? 'Update Catatan' : 'Tambah Catatan'}
        </button>
        {/* Tampilkan tombol batal jika dalam mode edit */}
        {initialNote && (
          <button
            type="button"
            className="form-button cancel"
            onClick={onCancelEdit}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;