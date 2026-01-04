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
  onClick,
  verticalOffset = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Get additional images for stack effect
  const yearPhotos = galleryData[year] || [];
  const stackImages = yearPhotos.slice(0, 3).map(p => p.img);

  return (
    <div
      className={`
        relative flex-shrink-0 justify-center items-center flex
        transform transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}
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
        className="
          relative bg-white rounded-2xl overflow-visible text-left
          shadow-lg transition-all duration-400 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
          w-56 md:w-64
        "
        aria-label={`View ${year} - ${title}`}
      >
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
              className="
                absolute inset-0 rounded-xl overflow-hidden bg-white shadow-md
                transition-all duration-300 ease-out
              "
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
      </button>
    </div>
  );
};

export default TimelineItem;
