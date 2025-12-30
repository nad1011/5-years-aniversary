import { useState, useEffect } from 'react';
import { galleryData } from '../data/galleryData';

// Default images for each year
const defaultImages = {
  '2020': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
  '2021': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
  '2022': 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
  '2023': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
  '2024-2025': 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop',
};

const TimelineItem = ({ 
  year, 
  title, 
  description, 
  index, 
  isVisible, 
  isExpanded,
  onClick,
  onClose,
  onImageClick,
  verticalOffset = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);
  
  // Get year range for display
  const getYearRange = () => {
    if (year === '2020') return '2020';
    if (year === '2021') return '2021';
    if (year === '2022') return '2022';
    if (year === '2023') return '2023';
    if (year === '2024-2025') return '2024 - 2025';
    return year;
  };

  const imageUrl = defaultImages[year] || defaultImages['2020'];
  
  // Get additional images for stack effect and expanded view
  const yearPhotos = galleryData[year] || [];
  const stackImages = yearPhotos.slice(0, 3).map(p => p.img);

  return (
    <div
      className={`
        relative flex-shrink-0
        transform transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}
        ${isExpanded ? 'z-20' : 'z-10'}
      `}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        marginTop: `${verticalOffset}px`
      }}
    >
      {/* Card */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative bg-white rounded-2xl overflow-visible text-left
          shadow-lg transition-all duration-400 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
          ${isExpanded ? 'w-[500px] md:w-[600px]' : 'w-56 md:w-64'}
        `}
        aria-label={`View ${year} - ${title}`}
      >
        {/* Collapsed state */}
        {!isExpanded && (
          <div className="p-4">
            {/* Title */}
            <h3 className="font-elegant text-lg md:text-xl font-medium text-gray-900 mb-0.5">
              {title}
            </h3>
            
            {/* Year range */}
            <p className="text-gray-400 text-xs font-clean mb-3">
              {getYearRange()}
            </p>
            
            {/* Image Stack Container */}
            <div className="relative h-40 md:h-48">
              {/* Background stacked cards (visible on hover) */}
              {stackImages.length > 1 && (
                <>
                  {/* Third card (bottom) */}
                  <div 
                    className={`
                      absolute inset-0 rounded-xl overflow-hidden bg-gray-200
                      transition-all duration-300 ease-out
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                      transform: isHovered 
                        ? 'rotate(8deg) translateX(12px) translateY(8px)' 
                        : 'rotate(0deg) translateX(0) translateY(0)',
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={stackImages[2] || stackImages[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Second card (middle) */}
                  <div 
                    className={`
                      absolute inset-0 rounded-xl overflow-hidden bg-gray-100
                      transition-all duration-300 ease-out
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                      transform: isHovered 
                        ? 'rotate(4deg) translateX(6px) translateY(4px)' 
                        : 'rotate(0deg) translateX(0) translateY(0)',
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={stackImages[1] || stackImages[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
              
              {/* Main image (top) */}
              <div 
                className={`
                  absolute inset-0 rounded-xl overflow-hidden bg-white shadow-md
                  transition-all duration-300 ease-out
                `}
                style={{
                  transform: isHovered 
                    ? 'rotate(-2deg) translateX(-4px) translateY(-4px)' 
                    : 'rotate(0deg) translateX(0) translateY(0)',
                  zIndex: 3,
                }}
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Expanded state - Modal Overlay */}
        {isExpanded && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            
            {/* Modal */}
            <div 
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                         w-[90vw] max-w-3xl bg-white rounded-3xl shadow-2xl
                         overflow-hidden animate-modal-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
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
                    {getYearRange()}
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
                  {yearPhotos.length > 0 && (
                    <button
                      onClick={(e) => onImageClick(0, e)}
                      className="w-full mb-3 rounded-xl overflow-hidden hover:scale-[1.01] 
                                 transition-all duration-300 focus:outline-none 
                                 focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                                 animate-slide-up text-left"
                    >
                      <img
                        src={yearPhotos[0].img}
                        alt={yearPhotos[0].caption}
                        className="w-full h-40 object-cover"
                      />
                      <div className="bg-white px-3 py-2">
                        <p className="text-pink-500 text-xs font-clean">
                          {yearPhotos[0].caption}
                        </p>
                      </div>
                    </button>
                  )}

                  {/* Second image - medium */}
                  {yearPhotos.length > 1 && (
                    <button
                      onClick={(e) => onImageClick(1, e)}
                      className="w-full mb-3 rounded-xl overflow-hidden hover:scale-[1.01] 
                                 transition-all duration-300 focus:outline-none 
                                 focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                                 animate-slide-up text-left"
                      style={{ animationDelay: '100ms' }}
                    >
                      <img
                        src={yearPhotos[1].img}
                        alt={yearPhotos[1].caption}
                        className="w-full h-32 object-cover"
                      />
                      <div className="bg-white px-3 py-2">
                        <p className="text-pink-500 text-xs font-clean">
                          {yearPhotos[1].caption}
                        </p>
                      </div>
                    </button>
                  )}

                  {/* Third image - no caption, just image */}
                  {yearPhotos.length > 2 && (
                    <button
                      onClick={(e) => onImageClick(2, e)}
                      className="w-full rounded-xl overflow-hidden hover:scale-[1.01] 
                                 transition-all duration-300 focus:outline-none 
                                 focus:ring-2 focus:ring-pink-400 shadow-md hover:shadow-lg
                                 animate-slide-up"
                      style={{ animationDelay: '200ms' }}
                    >
                      <img
                        src={yearPhotos[2].img}
                        alt={yearPhotos[2].caption}
                        className="w-full h-28 object-cover"
                      />
                    </button>
                  )}
                  
                  {/* If no photos, show default */}
                  {yearPhotos.length === 0 && (
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default TimelineItem;
