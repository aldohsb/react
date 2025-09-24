// src/components/NoteList.jsx
import React from 'react';
import './NoteList.css'; // Import file CSS untuk styling

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="no-notes-message">Belum ada catatan. Silakan tambahkan!</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h3 className="note-title">{note.title}</h3>
              <div className="note-actions">
                {/* Tombol edit dan hapus */}
                <button
                  className="action-button edit"
                  onClick={() => onEditNote(note.id)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => onDeleteNote(note.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
            <small className="note-timestamp">
              Dibuat: {new Date(note.timestamp).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;