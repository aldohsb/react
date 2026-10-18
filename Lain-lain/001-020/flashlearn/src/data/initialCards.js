/**
 * DATA INITIAL FLASHCARDS
 * 
 * Array of objects yang berisi flashcard default
 * Setiap card memiliki:
 * - id: unique identifier (penting untuk React keys)
 * - front: teks di bagian depan card (pertanyaan/kata)
 * - back: teks di bagian belakang card (jawaban/definisi)
 * 
 * Data structure yang simple dan mudah di-maintain
 */

export const initialCards = [
  {
    id: 1,
    front: "React",
    back: "Library JavaScript untuk membangun user interfaces dengan component-based architecture"
  },
  {
    id: 2,
    front: "useState",
    back: "React Hook untuk menambahkan state ke functional component. Mengembalikan array [state, setState]"
  },
  {
    id: 3,
    front: "Framer Motion",
    back: "Production-ready animation library untuk React dengan API yang declarative dan powerful"
  },
  {
    id: 4,
    front: "Props",
    back: "Singkatan dari properties. Cara untuk passing data dari parent component ke child component"
  },
  {
    id: 5,
    front: "Component",
    back: "Building block dari React app. Function atau class yang mengembalikan React element (JSX)"
  },
  {
    id: 6,
    front: "JSX",
    back: "JavaScript XML. Syntax extension yang memungkinkan kita menulis HTML-like code di JavaScript"
  }
];

/**
 * KENAPA EXPORT NAMED DARIPADA DEFAULT?
 * 
 * Named export: export const initialCards = [...]
 * - Lebih explicit saat import: import { initialCards } from './file'
 * - Bisa export multiple items dari satu file
 * - IDE auto-complete lebih baik
 * - Mencegah rename accident
 * 
 * Default export: export default initialCards
 * - Import dengan nama apapun: import cards from './file'
 * - Hanya satu default per file
 * - Lebih flexible tapi kurang explicit
 */