// App.jsx - Root component aplikasi PicGrid
// Component ini adalah entry point dari aplikasi

import PhotoGrid from './components/PhotoGrid';
import './App.css';

/**
 * App Component
 * Root component yang me-render PhotoGrid
 * 
 * Di aplikasi sederhana ini, App hanya me-render PhotoGrid
 * Di aplikasi yang lebih kompleks, App biasanya berisi:
 * - Router untuk multiple pages
 * - Global state management (Context/Redux)
 * - Theme provider
 * - Authentication wrapper
 */
function App() {
  return (
    <div className="app">
      {/* 
        PhotoGrid Component
        Component utama yang menampilkan gallery
      */}
      <PhotoGrid />
    </div>
  );
}

// Export default untuk digunakan di main.jsx
export default App;