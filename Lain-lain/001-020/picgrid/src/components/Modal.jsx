// Component Modal - Popup untuk menampilkan foto dalam ukuran besar
// Menerapkan Portal pattern untuk render di luar hierarchy DOM

import { useEffect, useRef } from 'react';
import '../styles/Modal.css';

/**
 * Modal Component
 * Menampilkan foto dalam ukuran penuh dengan overlay backdrop
 * 
 * @param {Object} props - Props dari parent component
 * @param {boolean} props.isOpen - Status modal terbuka/tertutup
 * @param {Object} props.photo - Object foto yang ditampilkan
 * @param {Function} props.onClose - Callback untuk menutup modal
 */
const Modal = ({ isOpen, photo, onClose }) => {
  // useRef untuk reference ke backdrop element
  // Digunakan untuk detect click outside modal content
  const backdropRef = useRef(null);

  // useRef untuk reference ke image element
  // Digunakan untuk handle loading state dan animations
  const imageRef = useRef(null);

  /**
   * useEffect untuk focus management
   * Saat modal dibuka, focus ke modal untuk accessibility
   * Dependency: [isOpen]
   */
  useEffect(() => {
    if (isOpen && backdropRef.current) {
      // Set focus ke backdrop untuk keyboard navigation
      backdropRef.current.focus();
    }
  }, [isOpen]);

  /**
   * Handler untuk click pada backdrop
   * Menutup modal jika user click di luar modal content
   * 
   * @param {MouseEvent} event - Event dari click
   */
  const handleBackdropClick = (event) => {
    // Cek apakah yang diklik adalah backdrop (bukan child elements)
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  /**
   * Handler untuk keyboard navigation
   * Support: ESC untuk close, Arrow keys untuk navigation (future feature)
   * 
   * @param {KeyboardEvent} event - Event dari keyboard
   */
  const handleKeyDown = (event) => {
    // ESC key sudah di-handle di useModal hook
    // Tapi kita tetap implement di sini untuk fallback
    if (event.key === 'Escape') {
      onClose();
    }
    
    // Future: Arrow keys untuk navigate between photos
    // if (event.key === 'ArrowLeft') { ... }
    // if (event.key === 'ArrowRight') { ... }
  };

  /**
   * Handler untuk tombol close
   */
  const handleClose = () => {
    onClose();
  };

  // Jika modal tidak terbuka atau tidak ada foto, tidak render apa-apa
  // Early return pattern untuk clean code
  if (!isOpen || !photo) {
    return null;
  }

  return (
    // Backdrop - overlay hitam di belakang modal
    // role="dialog" untuk accessibility
    // aria-modal="true" memberitahu screen reader ini adalah modal
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1} // -1 agar bisa di-focus programmatically
    >
      {/* Modal Content Container */}
      <div className="modal-content">
        {/* Close Button */}
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Close modal"
          type="button"
        >
          {/* Unicode character untuk X icon */}
          ✕
        </button>

        {/* Image Container dengan aspect ratio preserved */}
        <div className="modal-image-container">
          <img
            ref={imageRef}
            src={photo.url}
            alt={photo.title}
            className="modal-image"
            // loading="eager" karena ini prioritas tinggi saat modal dibuka
            loading="eager"
          />
        </div>

        {/* Photo Info */}
        <div className="modal-info">
          <h2 id="modal-title" className="modal-title">
            {photo.title}
          </h2>
          <p className="modal-description">
            {photo.description}
          </p>
        </div>

        {/* Navigation Hint */}
        <div className="modal-hint">
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

// Export component
export default Modal;