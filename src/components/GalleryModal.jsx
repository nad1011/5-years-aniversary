import { useEffect, useState } from 'react';

const GalleryModal = ({ year, photos, onClose, onImageClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger open animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-400
        ${isOpen ? 'modal-backdrop' : 'bg-transparent'}
      `}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      {/* Gallery container */}
      <div
        className={`
          relative w-full max-w-5xl max-h-[90vh] overflow-y-auto
          bg-white rounded-3xl shadow-2xl
          transform transition-all duration-400 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="
            absolute top-4 right-4 z-10 w-10 h-10
            flex items-center justify-center
            bg-gray-100 hover:bg-gray-200 rounded-full
            text-gray-700 hover:text-gray-900
            transition-all duration-300 hover:rotate-90
            focus:outline-none focus:ring-2 focus:ring-pink-400
          "
          aria-label="Close gallery"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gallery header */}
        <div className="p-8 pb-4">
          <h2 id="gallery-title" className="font-elegant text-3xl md:text-4xl font-medium text-gray-900 mb-2">
            {year}
          </h2>
          <p className="text-gray-500 text-base font-clean">
            Memories from this beautiful year
          </p>
        </div>

        {/* Photo grid */}
        <div className="p-8 pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => onImageClick(photo)}
              className="
                gallery-item relative aspect-square rounded-xl overflow-hidden
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                group
              "
              aria-label={`View ${photo.caption}`}
            >
              {/* Image */}
              <img
                src={photo.img}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Caption overlay (hidden by default, shows on hover) */}
              <div className="
                caption-overlay absolute inset-x-0 bottom-0
                bg-gradient-to-t from-black/80 via-black/40 to-transparent
                p-4
              ">
                <p className="text-white text-sm font-clean font-medium leading-tight">
                  {photo.caption}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="
                absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10
                transition-colors duration-300
              " />
            </button>
          ))}
        </div>

        {/* Empty state */}
        {photos.length === 0 && (
          <div className="text-center py-16 px-8">
            <p className="text-gray-500 text-lg font-clean">
              No photos yet for this year. Add your memories!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;
