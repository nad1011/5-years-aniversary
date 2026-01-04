import { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import GalleryModal from './GalleryModal';
import { timelineData, galleryData } from '../data/galleryData';

const Timeline = ({ onImageClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
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

  // Handle card click - open modal
  const handleCardClick = (year) => {
    setSelectedYear(year);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedYear(null);
  };

  // Handle image click for fullscreen - pass image object to App
  const handleImageClickFromModal = (imageIndex, e) => {
    if (e) e.stopPropagation();
    const photos = galleryData[selectedYear] || [];
    if (photos[imageIndex] && onImageClick) {
      onImageClick(photos[imageIndex]);
    }
  };

  // Automatically generate timeline periods from timeline data
  const generateTimelinePeriods = () => {
    if (!timelineData || timelineData.length === 0) return [];

    // Sort timeline data by date
    const sortedData = [...timelineData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get the earliest and latest dates
    const firstDate = new Date(sortedData[0].date);
    const lastDate = new Date(sortedData[sortedData.length - 1].date);
    
    // Create periods of 6 months each
    const periods = [];
    let currentStart = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    
    while (currentStart <= lastDate) {
      // Calculate end date (6 months from start)
      const currentEnd = new Date(currentStart);
      currentEnd.setMonth(currentEnd.getMonth() + 6);
      currentEnd.setDate(0); // Last day of previous month
      
      // Format label with start and end dates
      const startMonth = currentStart.getMonth() + 1;
      const startYear = currentStart.getFullYear();
      const endMonth = currentEnd.getMonth() + 1;
      const endYear = currentEnd.getFullYear();
      const label = `${startMonth}:${startYear} - ${endMonth}:${endYear}`;
      
      periods.push({
        label,
        start: new Date(currentStart),
        end: new Date(currentEnd)
      });
      
      // Move to next period
      currentStart.setMonth(currentStart.getMonth() + 6);
    }
    
    return periods;
  };

  const timelinePeriods = generateTimelinePeriods();

  // Width for each time period column
  const periodWidth = 300;

  // Group timeline items by period
  const getItemsForPeriod = (period) => {
    return timelineData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= period.start && itemDate <= period.end;
    });
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-white py-16 md:py-20 overflow-hidden"
    >
      {/* Top blur overlay for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-300 via-sky-300/50 to-transparent backdrop-blur-sm pointer-events-none z-10" />

      {/* Section title */}
      <div
        className={`
          relative z-10 px-8 mb-12 transform transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <h2 className="text-5xl md:text-4xl lg:text-5xl font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Our Journey
        </h2>
      </div>

      {/* Horizontal scrollable timeline grid */}
      <div
        ref={scrollContainerRef}
        className="relative px-8 overflow-x-auto overflow-y-hidden timeline-scroll"
      >
        <div className="inline-flex min-w-max">
          {(() => {
            let visualIndex = 0; // Track visual position for zigzag pattern
            return timelinePeriods.map((period, periodIndex) => {
              const itemsInPeriod = getItemsForPeriod(period);

              // Skip periods with no items
              if (itemsInPeriod.length === 0) return null;

              const currentVisualIndex = visualIndex;
              visualIndex++; // Increment for next period

              return (
                <div
                  key={period.label}
                  className="relative flex-shrink-0 border-r border-sky-200/50"
                  style={{ width: `${periodWidth}px` }}
                >
                  {/* Period label */}
                  <div
                    className={`
                      text-xs text-gray-500 font-clean text-center mb-2 pb-2
                      transform transition-all duration-500
                      ${isVisible ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{ transitionDelay: `${periodIndex * 50}ms` }}
                  >
                    {period.label}
                    <div className="w-0.5 h-0.5 bg-gray-400 rounded-full mx-auto mt-1" />
                  </div>

                  {/* Horizontal timeline line for this period */}
                  <div className="mb-4">
                    <div
                      className={`
                        h-px bg-gray-300/50 w-full
                        transform origin-left transition-all duration-1000
                        ${isVisible ? 'scale-x-100' : 'scale-x-0'}
                      `}
                      style={{ transitionDelay: `${periodIndex * 100}ms` }}
                    />
                  </div>

                  {/* Items in this period */}
                  <div className="relative px-4" style={{ minHeight: '500px' }}>
                    {itemsInPeriod.slice(0, 1).map((item, localIndex) => {
                      const globalIndex = timelineData.indexOf(item);
                      // Alternating vertical position based on visual index
                      const verticalOffset = currentVisualIndex % 2 === 0 ? 0 : 180;

                      return (
                        <div key={item.year}>
                          {globalIndex === 0 && (<div
                            className={`
                              absolute -left-28 top-1/2 transform -translate-y-1/2 -rotate-90
                              text-black text-xs tracking-[0.3em] font-clean uppercase
                              transition-all duration-700 hidden lg:block whitespace-nowrap z-10
                            `}
                          >
                            Mọi thứ bắt đầu từ đây
                          </div>)}
                          <div
                            className="absolute left-4 right-4"
                            style={{
                              top: `${verticalOffset}px`
                            }}
                          >
                          <TimelineItem
                            year={item.year}
                            title={item.title}
                            description={item.description}
                            index={globalIndex}
                            isVisible={isVisible}
                            onClick={() => handleCardClick(item.year)}
                            verticalOffset={0}
                          />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`
          text-center mt-8 text-gray-500 text-sm font-clean
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Shift + Scroll để lăn ngang nhé
        </span>
      </div>

      {/* Gallery Modal */}
      {selectedYear && (
        <GalleryModal
          year={selectedYear}
          title={timelineData.find(item => item.year === selectedYear)?.title || ''}
          description={timelineData.find(item => item.year === selectedYear)?.description || ''}
          photos={galleryData[selectedYear] || []}
          onClose={handleCloseModal}
          onImageClick={handleImageClickFromModal}
        />
      )}
    </section>
  );
};

export default Timeline;
