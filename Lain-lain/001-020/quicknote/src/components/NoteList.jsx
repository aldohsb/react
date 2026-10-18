import React from 'react';
import NoteCard from './NoteCard';

/**
 * NoteList Component
 * Container untuk menampilkan list of notes menggunakan grid layout
 * Menangani empty state jika tidak ada catatan
 * 
 * @param {array} notes - Array of note objects
 * @param {function} onEdit - Callback function untuk edit note
 * @param {function} onDelete - Callback function untuk delete note
 */
const NoteList = ({ notes, onEdit, onDelete }) => {
  // Early return jika tidak ada catatan
  // Menampilkan empty state dengan ilustrasi
  if (notes.length === 0) {
    return (
      <div className="py-16 text-center">
        {/* Empty state illustration menggunakan emoji besar */}
        <div className="mb-4 text-8xl">📝</div>
        
        {/* Empty state message */}
        <h3 className="mb-2 text-2xl font-semibold text-gray-600">
          Belum Ada Catatan
        </h3>
        <p className="text-gray-500">
          Mulai buat catatan pertama Anda menggunakan form di atas
        </p>
      </div>
    );
  }

  return (
    // Section container
    <div>
      {/* Section title */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        📋 Semua Catatan ({notes.length})
      </h2>
      
      {/* Grid layout untuk notes */}
      {/* Responsive grid: 1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 
          Map through notes array dan render NoteCard untuk setiap note
          Key prop penting untuk React optimization (reconciliation)
        */}
        {notes.map((note) => (
          <NoteCard
            key={note.id} // Unique key untuk setiap element dalam list
            note={note} // Pass note data sebagai prop
            onEdit={onEdit} // Pass edit handler
            onDelete={onDelete} // Pass delete handler
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;