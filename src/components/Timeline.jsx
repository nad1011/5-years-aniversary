import { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import { timelineData, galleryData } from '../data/galleryData';

const Timeline = ({ onImageClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Observe section visibility for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle card click - expand the card
  const handleCardClick = (year) => {
    if (expandedCard === year) {
      setExpandedCard(null);
    } else {
      setExpandedCard(year);
    }
  };

  // Handle close expanded card
  const handleCloseCard = (e) => {
    e.stopPropagation();
    setExpandedCard(null);
  };

  // Handle image click for fullscreen - pass image object to App
  const handleImageClickFromCard = (year, imageIndex, e) => {
    e.stopPropagation();
    const photos = galleryData[year] || [];
    if (photos[imageIndex] && onImageClick) {
      onImageClick(photos[imageIndex]);
    }
  };

  // Extended year markers for horizontal timeline (more granular)
  const yearMarkers = ['1000', '1200', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2020', '2025'];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white py-16 md:py-20 overflow-hidden"
    >
      {/* Section title */}
      <div
        className={`
          px-8 mb-12 transform transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <h2 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800 italic">
          Our Story
        </h2>
      </div>

      {/* Year markers - horizontal scrollable */}
      <div className="px-8 mb-2 overflow-x-auto timeline-scroll">
        <div className="flex items-center min-w-max" style={{ gap: '80px' }}>
          {yearMarkers.map((year, index) => (
            <div
              key={year}
              className={`
                text-xs text-gray-500 font-clean flex-shrink-0
                transform transition-all duration-500
                ${isVisible ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {year}
              <div className="w-0.5 h-0.5 bg-gray-400 rounded-full mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal timeline line */}
      <div className="px-8 mb-0">
        <div
          className={`
            h-px bg-gray-300/50 w-full
            transform origin-left transition-all duration-1000
            ${isVisible ? 'scale-x-100' : 'scale-x-0'}
          `}
        />
      </div>

      {/* Vertical divider lines - spanning full height */}
      <div className="relative">
        <div 
          className="absolute top-0 left-8 right-0 h-[600px] flex pointer-events-none overflow-hidden"
          style={{ gap: '80px' }}
        >
          {yearMarkers.map((year, index) => (
            <div
              key={year}
              className={`
                w-px bg-sky-200/50 h-full flex-shrink-0
                transform origin-top transition-all duration-700
                ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 80 + 200}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Side text */}
      <div
        className={`
          absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center
          text-gray-300 text-xs tracking-[0.3em] font-clean uppercase
          transition-all duration-700 hidden lg:block whitespace-nowrap
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        Everything kinda started here
      </div>

      {/* Timeline cards - horizontal scroll with staggered positions */}
      <div
        ref={scrollContainerRef}
        className="relative px-8 pt-8 pb-8 overflow-x-auto timeline-scroll"
      >
        <div className="flex items-start min-w-max" style={{ gap: '120px', height: '500px' }}>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              image={item.image}
              index={index}
              isVisible={isVisible}
              isExpanded={expandedCard === item.year}
              onClick={() => handleCardClick(item.year)}
              onClose={handleCloseCard}
              onImageClick={(imageIndex, e) => handleImageClickFromCard(item.year, imageIndex, e)}
              verticalOffset={index % 2 === 0 ? 280 : 40}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div 
        className={`
          text-center mt-4 text-gray-500 text-sm font-clean
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default Timeline;
