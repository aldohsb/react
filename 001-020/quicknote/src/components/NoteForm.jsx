import React, { useState, useRef, useEffect } from 'react';

/**
 * NoteForm Component
 * Form untuk membuat atau mengedit catatan
 * Menggunakan controlled components dengan useState
 * 
 * @param {function} onSubmit - Callback function saat form di-submit
 * @param {object} editNote - Data catatan yang sedang diedit (optional)
 * @param {function} onCancelEdit - Callback untuk cancel edit mode
 */
const NoteForm = ({ onSubmit, editNote, onCancelEdit }) => {
  // State untuk menyimpan value input title
  // Jika ada editNote, gunakan title dari editNote, jika tidak gunakan string kosong
  const [title, setTitle] = useState(editNote?.title || '');
  
  // State untuk menyimpan value textarea content
  const [content, setContent] = useState(editNote?.content || '');
  
  // useRef untuk mendapatkan reference ke input element
  // Ini digunakan untuk auto-focus saat komponen render
  const titleInputRef = useRef(null);

  // useEffect untuk auto-focus input saat komponen mount atau editNote berubah
  useEffect(() => {
    // Jika editNote berubah, update state title dan content
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
    
    // Focus ke input title
    // optional chaining (?.) untuk mencegah error jika ref null
    titleInputRef.current?.focus();
  }, [editNote]); // Efek ini berjalan saat editNote berubah

  /**
   * Handler untuk submit form
   * Mencegah default behavior (page reload) dan validasi input
   */
  const handleSubmit = (e) => {
    // Prevent default form submission yang akan reload page
    e.preventDefault();
    
    // Validasi: pastikan title dan content tidak kosong
    // trim() untuk menghapus whitespace di awal dan akhir
    if (!title.trim() || !content.trim()) {
      // Jika ada yang kosong, tampilkan alert dan return (stop execution)
      alert('Judul dan isi catatan tidak boleh kosong!');
      return;
    }
    
    // Panggil callback onSubmit dengan data title dan content
    onSubmit({ title: title.trim(), content: content.trim() });
    
    // Reset form setelah submit berhasil
    setTitle('');
    setContent('');
    
    // Focus kembali ke input title untuk UX yang lebih baik
    titleInputRef.current?.focus();
  };

  /**
   * Handler untuk cancel edit mode
   */
  const handleCancel = () => {
    // Reset form
    setTitle('');
    setContent('');
    
    // Panggil callback onCancelEdit jika ada
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    // Container form dengan styling card
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      {/* Title form: berbeda antara mode create dan edit */}
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {editNote ? '✏️ Edit Catatan' : '➕ Buat Catatan Baru'}
      </h2>
      
      {/* Form element dengan onSubmit handler */}
      <form onSubmit={handleSubmit}>
        {/* Input field untuk title */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
            Judul
          </label>
          <input
            ref={titleInputRef} // Attach ref untuk auto-focus
            type="text"
            id="title"
            value={title} // Controlled component: value dari state
            onChange={(e) => setTitle(e.target.value)} // Update state saat user mengetik
            placeholder="Masukkan judul catatan..."
            className="w-full px-4 py-2 transition-colors border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>
        
        {/* Textarea untuk content */}
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
            Isi Catatan
          </label>
          <textarea
            id="content"
            value={content} // Controlled component
            onChange={(e) => setContent(e.target.value)} // Update state
            placeholder="Tulis isi catatan..."
            rows="6"
            className="w-full px-4 py-2 transition-colors border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-teal-500"
          />
        </div>
        
        {/* Button group */}
        <div className="flex gap-3">
          {/* Submit button dengan conditional text */}
          <button
            type="submit"
            className="flex-1 px-6 py-3 font-semibold text-white transition-colors bg-teal-500 rounded-lg shadow-sm hover:bg-teal-600 hover:shadow-md"
          >
            {editNote ? 'Simpan Perubahan' : 'Tambah Catatan'}
          </button>
          
          {/* Cancel button: hanya tampil di edit mode */}
          {editNote && (
            <button
              type="button" // type="button" agar tidak trigger submit
              onClick={handleCancel}
              className="px-6 py-3 font-semibold text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;