import { useEffect, useState } from 'react';

const GalleryModal = ({ year, title, description, photos, onClose, onImageClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  // Handle image click to change selected image
  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle fullscreen button click
  const handleFullscreenClick = (e) => {
    e.stopPropagation();
    if (photos[selectedImageIndex] && onImageClick) {
      onImageClick(selectedImageIndex, e);
    }
  };

  // Get current selected photo details
  const currentPhoto = photos[selectedImageIndex] || {};
  const currentTitle = currentPhoto.caption || title;
  const currentDescription = description;

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
        <div className="flex flex-col md:flex-row min-h-[400px] max-h-[80vh]">
          {/* Left side - Text content */}
          <div className="p-8 md:w-2/5 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h3 className="font-elegant text-3xl md:text-4xl font-medium text-gray-900 mb-2">
                {currentTitle}
              </h3>
              
              {/* Year range */}
              <p className="text-gray-400 text-sm font-clean mb-6">
                {year}
              </p>
              
              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed font-clean">
                {currentDescription}
              </p>
            </div>

            {/* Fullscreen button */}
            <button
              onClick={handleFullscreenClick}
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 
                         bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
                         text-white font-clean rounded-full transition-all duration-300
                         transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>View Fullscreen</span>
            </button>
          </div>

          {/* Right side - Scrolling Images Gallery */}
          <div className="md:w-3/5 bg-gradient-to-br from-pink-50/30 to-blue-50/30 
                          overflow-y-auto modal-gallery-scroll p-5">
            {/* Display all photos dynamically */}
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`w-full mb-3 rounded-xl overflow-hidden hover:scale-[1.01] 
                           transition-all duration-300 focus:outline-none 
                           shadow-md hover:shadow-lg animate-slide-up text-left
                           ${selectedImageIndex === index ? 'ring-4 ring-pink-400' : 'ring-2 ring-transparent'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={photo.img}
                  alt={photo.caption}
                  className={`w-full object-cover ${
                    index === 0 ? 'h-40' : index === 1 ? 'h-32' : 'h-28'
                  }`}
                />
                {photo.caption && (
                  <div className="bg-white px-3 py-2">
                    <p className="text-pink-500 text-xs font-clean">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </button>
            ))}
            
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
