// Component PhotoGrid - Container utama untuk gallery
// Menerapkan CSS Grid layout dan state management

import { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import Modal from './Modal';
import { useModal } from '../hooks/useModal';
import { photos as initialPhotos } from '../data/photos';
import '../styles/PhotoGrid.css';

/**
 * PhotoGrid Component
 * Component utama yang mengatur layout grid dan modal
 * Mendemonstrasikan useState, useEffect, dan custom hooks
 */
const PhotoGrid = () => {
  // State untuk menyimpan array photos
  // Menggunakan useState untuk reactive data
  const [photos, setPhotos] = useState([]);

  // State untuk loading state saat fetch data
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook untuk modal management
  // Ini contoh reusable logic dengan custom hooks
  const { isOpen, selectedPhoto, openModal, closeModal } = useModal();

  /**
   * useEffect untuk simulate data fetching
   * Dependency: [] (empty array) = hanya run sekali saat mount
   * 
   * Pattern: Data fetching on component mount
   * Ini simulate API call, di real app akan fetch dari server
   */
  useEffect(() => {
    // Simulate async data fetching dengan setTimeout
    // Di real app, ini akan diganti dengan fetch() atau axios
    const loadPhotos = () => {
      // Simulate network delay
      setTimeout(() => {
        setPhotos(initialPhotos); // Set photos dari data
        setIsLoading(false);       // Set loading selesai
      }, 1000); // 1 detik delay untuk UX yang lebih realistis
    };

    // Call function untuk load photos
    loadPhotos();

    // Cleanup function (optional untuk case ini)
    // Bisa digunakan untuk cancel pending requests
    return () => {
      // Cleanup logic di sini jika diperlukan
      // Contoh: abort fetch request
    };
  }, []); // Empty dependency array = run once on mount

  /**
   * useEffect untuk log saat photo dipilih
   * Dependency: [selectedPhoto] = run setiap selectedPhoto berubah
   * 
   * Pattern: Side effects based on state changes
   * Berguna untuk debugging atau analytics tracking
   */
  useEffect(() => {
    if (selectedPhoto) {
      console.log('Photo selected:', selectedPhoto.title);
      // Di real app, bisa kirim analytics event di sini
      // trackEvent('photo_viewed', { photoId: selectedPhoto.id });
    }
  }, [selectedPhoto]); // Run when selectedPhoto changes

  /**
   * Handler saat photo card diklik
   * Membuka modal dengan photo yang dipilih
   * 
   * @param {Object} photo - Photo object yang diklik
   */
  const handlePhotoClick = (photo) => {
    openModal(photo);
  };

  /**
   * Render loading skeleton saat data belum siap
   * Memberikan feedback visual ke user
   */
  if (isLoading) {
    return (
      <div className="photo-grid-container">
        <header className="photo-grid-header">
          <h1 className="photo-grid-title">PicGrid</h1>
          <p className="photo-grid-subtitle">Loading beautiful photos...</p>
        </header>
        
        {/* Grid skeleton dengan 9 placeholder cards */}
        <div className="photo-grid">
          {/* Array.from() untuk create array dengan length tertentu */}
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="photo-card photo-card--skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /**
   * Render empty state jika tidak ada photos
   * Edge case handling untuk UX yang lebih baik
   */
  if (photos.length === 0) {
    return (
      <div className="photo-grid-container">
        <header className="photo-grid-header">
          <h1 className="photo-grid-title">PicGrid</h1>
          <p className="photo-grid-subtitle">No photos available</p>
        </header>
        <div className="photo-grid-empty">
          <span className="empty-icon">📷</span>
          <p>No photos to display</p>
        </div>
      </div>
    );
  }

  /**
   * Main render - tampilkan grid dengan photos
   */
  return (
    <div className="photo-grid-container">
      {/* Header Section */}
      <header className="photo-grid-header">
        <h1 className="photo-grid-title">PicGrid</h1>
        <p className="photo-grid-subtitle">
          A beautiful pastel photo gallery • {photos.length} photos
        </p>
      </header>

      {/* Grid Section dengan CSS Grid */}
      <div className="photo-grid">
        {/* 
          Map over photos array untuk render PhotoCard
          Key prop penting untuk React reconciliation
          Gunakan unique ID, jangan gunakan index sebagai key
        */}
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}              // Unique key untuk React
            photo={photo}                // Pass photo data
            onClick={handlePhotoClick}   // Pass click handler
          />
        ))}
      </div>

      {/* 
        Modal Component
        Rendered conditionally based on isOpen state
        Modal akan handle sendiri visibility-nya
      */}
      <Modal
        isOpen={isOpen}
        photo={selectedPhoto}
        onClose={closeModal}
      />

      {/* Footer */}
      <footer className="photo-grid-footer">
        <p>Built with React • CSS Grid • useState & useEffect</p>
      </footer>
    </div>
  );
};

// Export component
export default PhotoGrid;