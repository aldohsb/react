/**
 * HEADER COMPONENT
 * 
 * Komponen presentational (UI only, no business logic)
 * Menampilkan judul aplikasi dan tagline
 * 
 * KONSEP: Functional Component
 * Component ini adalah pure function yang menerima props dan return JSX
 */

function Header() {
  return (
    <header style={styles.header}>
      {/* Container untuk konten header */}
      <div style={styles.container}>
        {/* Logo/Title dengan emoji untuk visual interest */}
        <h1 style={styles.title}>
          <span style={styles.emoji}>🎴</span>
          FlashLearn
        </h1>
        
        {/* Tagline/Subtitle */}
        <p style={styles.subtitle}>
          Belajar lebih efektif dengan flashcard interaktif
        </p>
      </div>
    </header>
  );
}

/**
 * INLINE STYLES dengan JavaScript Object
 * 
 * Keuntungan:
 * - Dynamic styling dengan JavaScript
 * - Scoped ke component ini saja
 * - Type-safe dengan IDE autocomplete
 * 
 * Trade-off:
 * - Tidak ada CSS pseudo-classes (:hover)
 * - Bundle size sedikit lebih besar
 * - Untuk proyek kecil ini, inline styles sudah cukup
 */
const styles = {
  header: {
    // Gradient background dari purple ke transparent
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
    
    // Padding vertical dan horizontal
    padding: '3rem 1rem',
    
    // Text center untuk alignment
    textAlign: 'center',
    
    // Border bottom untuk subtle separation
    borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
  },
  
  container: {
    // Max width untuk readability
    maxWidth: '1200px',
    
    // Center container
    margin: '0 auto',
  },
  
  title: {
    // Font size yang besar untuk hierarchy
    fontSize: '3rem',
    
    // Font weight bold untuk emphasis
    fontWeight: '700',
    
    // Gradient text color untuk visual interest
    background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
    
    // Clip background ke text
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    
    // Transparent text untuk show gradient
    WebkitTextFillColor: 'transparent',
    
    // Remove default margin
    margin: '0 0 0.5rem 0',
    
    // Flexbox untuk align emoji dengan text
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  
  emoji: {
    // Emoji tidak perlu gradient, jadi reset fill color
    WebkitTextFillColor: 'initial',
    
    // Slight animation untuk fun
    display: 'inline-block',
    
    // Animation akan ditambahkan via CSS jika diperlukan
  },
  
  subtitle: {
    // Font size untuk hierarchy
    fontSize: '1.125rem',
    
    // Gray color untuk de-emphasize
    color: '#52525b',
    
    // Font weight medium
    fontWeight: '500',
    
    // Remove default margin
    margin: 0,
  }
};

/**
 * RESPONSIVE DESIGN dengan Media Query (Alternative approach)
 * 
 * Untuk production app, lebih baik gunakan:
 * 1. CSS Modules
 * 2. Styled Components
 * 3. Tailwind CSS
 * 
 * Tapi untuk learning purpose, inline styles lebih mudah dipahami
 */

// Export default karena ini main component dari file ini
export default Header;