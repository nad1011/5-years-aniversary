import { useEffect, useState } from 'react';

const FullscreenViewer = ({ image, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger open animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  if (!image) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[60] flex items-center justify-center p-4
        transition-all duration-300
        ${isOpen ? 'fullscreen-backdrop' : 'bg-transparent'}
      `}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen image viewer"
    >
      {/* Image container */}
      <div
        className={`
          relative max-w-full max-h-full flex flex-col items-center
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="
            absolute -top-12 right-0 z-10 w-10 h-10
            flex items-center justify-center
            bg-white/20 hover:bg-white/30 rounded-full
            text-white hover:text-pink-300
            transition-all duration-300 hover:rotate-90
            focus:outline-none focus:ring-2 focus:ring-pink-400
          "
          aria-label="Close fullscreen viewer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Fullscreen image */}
        <img
          src={image.img}
          alt={image.caption}
          className="
            max-w-full max-h-[80vh] object-contain rounded-xl
            shadow-2xl
          "
        />

        {/* Caption */}
        <div className="
          mt-4 bg-white/95 rounded-xl px-6 py-4
          max-w-2xl text-center shadow-lg
        ">
          <p className="text-gray-800 text-base md:text-lg font-clean">
            {image.caption}
          </p>
        </div>

        {/* Click hint */}
        <p className="text-white/60 text-sm mt-4 font-clean">
          Click anywhere to close
        </p>
      </div>
    </div>
  );
};

export default FullscreenViewer;
