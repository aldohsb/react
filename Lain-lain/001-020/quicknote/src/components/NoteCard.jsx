import React from 'react';
import { formatDate } from '../utils/helpers';

/**
 * NoteCard Component
 * Menampilkan individual note card dengan action buttons
 * 
 * @param {object} note - Object catatan dengan properties: id, title, content, createdAt
 * @param {function} onEdit - Callback function untuk edit note
 * @param {function} onDelete - Callback function untuk delete note
 */
const NoteCard = ({ note, onEdit, onDelete }) => {
  /**
   * Handler untuk tombol edit
   * Memanggil callback onEdit dengan data note
   */
  const handleEdit = () => {
    onEdit(note);
  };

  /**
   * Handler untuk tombol delete
   * Menampilkan konfirmasi sebelum delete
   */
  const handleDelete = () => {
    // Tampilkan dialog konfirmasi
    // window.confirm returns true jika user klik OK, false jika Cancel
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus catatan "${note.title}"?`
    );
    
    // Hanya delete jika user konfirmasi
    if (isConfirmed) {
      onDelete(note.id);
    }
  };

  return (
    // Card container dengan hover effect
    <div className="p-6 transition-shadow duration-200 bg-white border-l-4 border-teal-500 rounded-lg shadow-md hover:shadow-lg">
      {/* Header card: title dan timestamp */}
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          {note.title}
        </h3>
        
        {/* Timestamp dengan icon */}
        <p className="text-sm text-gray-500">
          🕒 {formatDate(note.createdAt)}
        </p>
      </div>
      
      {/* Content catatan */}
      <div className="mb-4">
        {/* whitespace-pre-wrap untuk preserve line breaks dari textarea */}
        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
          {note.content}
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {/* Edit button */}
        <button
          onClick={handleEdit}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-medium text-teal-700 transition-colors rounded-lg bg-teal-50 hover:bg-teal-100"
          aria-label={`Edit catatan ${note.title}`} // Accessibility
        >
          {/* Icon edit menggunakan emoji */}
          <span>✏️</span>
          <span>Edit</span>
        </button>
        
        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-medium text-red-700 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
          aria-label={`Hapus catatan ${note.title}`} // Accessibility
        >
          {/* Icon delete menggunakan emoji */}
          <span>🗑️</span>
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;