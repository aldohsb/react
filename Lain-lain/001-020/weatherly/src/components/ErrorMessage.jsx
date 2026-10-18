/**
 * Error Message Component
 * Komponen untuk menampilkan pesan error dengan styling yang baik
 * Props: message (string) - pesan error yang akan ditampilkan
 */

const ErrorMessage = ({ message }) => {
  return (
    // Container dengan background merah muda dan rounded corners
    <div className="p-4 my-4 border-l-4 border-red-500 rounded-r-lg bg-red-50">
      <div className="flex items-start">
        {/* Icon error - menggunakan SVG untuk cross/X */}
        <div className="flex-shrink-0">
          <svg 
            className="w-6 h-6 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {/* Path untuk icon X dalam circle */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        {/* Container untuk text */}
        <div className="ml-3">
          {/* Label "Error" */}
          <h3 className="text-sm font-medium text-red-800">
            Terjadi Kesalahan
          </h3>
          
          {/* Pesan error dari props */}
          <p className="mt-1 text-sm text-red-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export component
export default ErrorMessage;