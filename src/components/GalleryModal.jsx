import { useEffect, useState } from 'react';

const GalleryModal = ({ year, title, description, photos, onClose, onImageClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger open animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
          w-[90vw] max-w-3xl bg-white rounded-3xl shadow-2xl
          overflow-hidden
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center 
                     rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row min-h-[400px] max-h-[80vh]">
          {/* Left side - Text content */}
          <div className="p-8 md:w-2/5 flex flex-col justify-center">
            {/* Title */}
            <h3 className="font-elegant text-3xl md:text-4xl font-medium text-gray-900 mb-2">
              {title}
            </h3>
            
            {/* Year range */}
            <p className="text-gray-400 text-sm font-clean mb-6">
              {year}
            </p>
            
            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed font-clean">
              {description}
            </p>
          </div>

          {/* Right side - Scrolling Images Gallery */}
          <div className="md:w-3/5 bg-gradient-to-br from-pink-50/30 to-blue-50/30 
                          overflow-y-auto modal-gallery-scroll p-5">
            {/* First image - larger */}
            {photos.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(0, e);
                }}
                className="w-full mb-3 rounded-xl overflow-hidden hover:scale-[1.01] 
                           transition-all duration-300 focus:outline-none 
                           focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                           animate-slide-up text-left"
              >
                <img
                  src={photos[0].img}
                  alt={photos[0].caption}
                  className="w-full h-40 object-cover"
                />
                <div className="bg-white px-3 py-2">
                  <p className="text-pink-500 text-xs font-clean">
                    {photos[0].caption}
                  </p>
                </div>
              </button>
            )}

            {/* Second image - medium */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(1, e);
                }}
                className="w-full mb-3 rounded-xl overflow-hidden hover:scale-[1.01] 
                           transition-all duration-300 focus:outline-none 
                           focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                           animate-slide-up text-left"
                style={{ animationDelay: '100ms' }}
              >
                <img
                  src={photos[1].img}
                  alt={photos[1].caption}
                  className="w-full h-32 object-cover"
                />
                <div className="bg-white px-3 py-2">
                  <p className="text-pink-500 text-xs font-clean">
                    {photos[1].caption}
                  </p>
                </div>
              </button>
            )}

            {/* Third image - no caption, just image */}
            {photos.length > 2 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(2, e);
                }}
                className="w-full rounded-xl overflow-hidden hover:scale-[1.01] 
                           transition-all duration-300 focus:outline-none 
                           focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                           animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                <img
                  src={photos[2].img}
                  alt={photos[2].caption}
                  className="w-full h-28 object-cover"
                />
              </button>
            )}
            
            {/* If no photos */}
            {photos.length === 0 && (
              <div className="text-center text-gray-400 text-sm font-clean py-8">
                No photos available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryModal;
