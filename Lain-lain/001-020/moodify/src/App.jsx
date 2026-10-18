// src/App.jsx

// Import CSS global
import './styles/globals.css';

// Import MoodProvider untuk membungkus aplikasi dengan Context
import { MoodProvider } from './context/MoodContext';

// Import semua komponen
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { MoodDisplay } from './components/MoodDisplay';

function App() {
  return (
    // Wrap seluruh aplikasi dengan MoodProvider
    // Ini membuat semua child components bisa mengakses MoodContext
    <MoodProvider>
      {/* Main container */}
      <div className="app-container">
        {/* Header component */}
        <Header />

        {/* Main content area */}
        <main className="main-content">
          {/* Grid layout untuk 2 kolom */}
          <div className="content-grid">
            {/* Kolom kiri: Mood Selector */}
            <MoodSelector />

            {/* Kolom kanan: Mood Display */}
            <MoodDisplay />
          </div>
        </main>

        {/* Footer sederhana */}
        <footer className="footer">
          <p>Made with <span className="heart">♥</span> using React Context API & CSS Variables</p>
        </footer>
      </div>
    </MoodProvider>
  );
}

export default App;