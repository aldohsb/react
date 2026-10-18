// Component PhotoCard - Card individual untuk setiap foto
// Menerapkan prinsip Single Responsibility: hanya handle tampilan 1 foto

import { useState } from 'react';
import '../styles/PhotoCard.css';

/**
 * PhotoCard Component
 * Menampilkan satu foto dalam card dengan hover effect
 * 
 * @param {Object} props - Props dari parent component
 * @param {Object} props.photo - Object foto yang akan ditampilkan
 * @param {Function} props.onClick - Callback function saat foto diklik
 */
const PhotoCard = ({ photo, onClick }) => {
  // State untuk tracking loading image
  // Default: true (sedang loading)
  const [isLoading, setIsLoading] = useState(true);

  // State untuk tracking error saat load image
  // Default: false (tidak ada error)
  const [hasError, setHasError] = useState(false);

  /**
   * Handler saat image selesai loading
   * Dipanggil oleh event onLoad dari tag <img>
   */
  const handleImageLoad = () => {
    setIsLoading(false); // Set loading selesai
  };

  /**
   * Handler saat image gagal loading
   * Dipanggil oleh event onError dari tag <img>
   */
  const handleImageError = () => {
    setIsLoading(false); // Set loading selesai
    setHasError(true);   // Set flag error
  };

  /**
   * Handler saat card diklik
   * Memanggil callback onClick dari parent dengan data foto
   */
  const handleClick = () => {
    // Hanya trigger onClick jika tidak ada error
    if (!hasError) {
      onClick(photo);
    }
  };

  /**
   * Handler untuk keyboard accessibility
   * Memungkinkan card diklik dengan keyboard (Enter/Space)
   * 
   * @param {KeyboardEvent} event - Event dari keyboard
   */
  const handleKeyPress = (event) => {
    // Enter key (keyCode 13) atau Space key (keyCode 32)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Cegah default behavior (scroll untuk space)
      handleClick();
    }
  };

  return (
    // Container card dengan role button untuk accessibility
    // tabIndex="0" membuat element bisa di-focus dengan keyboard
    <div 
      className="photo-card"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
    >
      {/* Loading skeleton - ditampilkan saat image masih loading */}
      {isLoading && (
        <div className="photo-card__skeleton" aria-hidden="true">
          <div className="skeleton-shimmer"></div>
        </div>
      )}

      {/* Error state - ditampilkan jika image gagal load */}
      {hasError && (
        <div className="photo-card__error">
          <span>⚠️</span>
          <p>Failed to load image</p>
        </div>
      )}

      {/* Image - selalu di-render tapi visibility controlled by CSS */}
      {!hasError && (
        <img
          src={photo.thumbnail}
          alt={photo.title}
          className={`photo-card__image ${isLoading ? 'loading' : 'loaded'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy" // Native lazy loading (feature 2025)
        />
      )}

      {/* Overlay yang muncul saat hover */}
      <div className="photo-card__overlay">
        <h3 className="photo-card__title">{photo.title}</h3>
        <p className="photo-card__description">{photo.description}</p>
      </div>

      {/* Zoom icon indicator */}
      <div className="photo-card__zoom-icon" aria-hidden="true">
        🔍
      </div>
    </div>
  );
};

// Export component
export default PhotoCard;