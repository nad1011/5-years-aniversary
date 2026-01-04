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

  // Timeline periods - each represents a time range
  const timelinePeriods = [
    { label: '1-2021', start: new Date('2021-01-01'), end: new Date('2021-05-31') },
    { label: '12-2021', start: new Date('2021-06-01'), end: new Date('2022-12-31') },
    { label: '1-2022', start: new Date('2022-01-01'), end: new Date('2022-05-30') },
    { label: '12-2022', start: new Date('2022-06-01'), end: new Date('2023-12-31') },
    { label: '6-2023', start: new Date('2023-06-01'), end: new Date('2023-11-30') },
    { label: '12-2023', start: new Date('2023-12-01'), end: new Date('2024-05-31') },
    { label: '6-2024', start: new Date('2024-06-01'), end: new Date('2024-11-30') },
    { label: '12-2024', start: new Date('2024-12-01'), end: new Date('2025-05-31') },
    { label: '6-2025', start: new Date('2025-06-01'), end: new Date('2025-11-30') },
    { label: '12-2025', start: new Date('2025-12-01'), end: new Date('2025-12-31') },
  ];

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
        <h2 className="font-clean font-medium text-4xl md:text-5xl lg:text-5xl text-gray-800">
          Nhật ký hành trình
        </h2>
      </div>

      {/* Horizontal scrollable timeline grid */}
      <div
        ref={scrollContainerRef}
        className="relative px-8 overflow-x-auto overflow-y-hidden timeline-scroll"
      >
        <div className="inline-flex min-w-max">
          {timelinePeriods.map((period, periodIndex) => {
            const itemsInPeriod = getItemsForPeriod(period);

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
                  {itemsInPeriod.map((item) => {
                    const globalIndex = timelineData.indexOf(item);
                    const verticalOffset = globalIndex % 2 === 0 ? 0 : 180;

                    return (
                      <>
                        {globalIndex == 1 && (<div
                          className={`
                            absolute -left-28 top-1/2 transform -translate-y-1/2 -rotate-90
                            text-black text-xs tracking-[0.3em] font-clean uppercase
                            transition-all duration-700 hidden lg:block whitespace-nowrap z-10
                          `}
                        >
                          Mọi thứ bắt đầu từ đây
                        </div>)}
                        <div
                          key={item.year}
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
                      </>
                    );
                  })}

                  {/* Empty state if no items in period */}
                  {itemsInPeriod.length === 0 && (
                    <div className="text-center text-gray-400 text-sm font-clean py-8">
                      Hem có gì
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
