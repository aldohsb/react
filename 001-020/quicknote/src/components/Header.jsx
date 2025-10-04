import React from 'react';

/**
 * Header Component
 * Menampilkan judul aplikasi dan jumlah total catatan
 * 
 * @param {number} noteCount - Jumlah total catatan yang tersimpan
 */
const Header = ({ noteCount }) => {
  return (
    // Container header dengan padding dan border bottom
    <header className="px-4 py-6 mb-8 bg-white border-b-2 border-teal-500 shadow-sm">
      <div className="max-w-4xl mx-auto">
        {/* Title dengan gradient text effect */}
        <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text">
          QuickNote
        </h1>
        
        {/* Subtitle dengan info jumlah catatan */}
        <p className="text-gray-600">
          {/* Conditional rendering untuk grammar yang benar */}
          {noteCount === 0 ? (
            'Belum ada catatan. Mulai buat catatan pertamamu!'
          ) : (
            // Template literal untuk menampilkan jumlah catatan
            `${noteCount} ${noteCount === 1 ? 'catatan' : 'catatan'} tersimpan`
          )}
        </p>
      </div>
    </header>
  );
};

export default Header;