import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTimeline = () => {
    const timeline = document.getElementById('timeline');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sky blue gradient background with clouds - smoother transition to timeline */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-300 to-sky-200 cloud-bg" />
      
      {/* Rainbow stripes - top right corner */}
      <div className="absolute top-0 right-0 w-48 h-64 overflow-hidden">
        <div className="rainbow-stripe w-32 h-96 rounded-full transform rotate-45 translate-x-16 -translate-y-20" />
      </div>
      
      {/* Rainbow stripes - bottom left corner */}
      <div className="absolute bottom-0 left-0 w-48 h-64 overflow-hidden">
        <div className="rainbow-stripe w-32 h-96 rounded-full transform -rotate-45 -translate-x-16 translate-y-20" />
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Smiley faces */}
        <span className="absolute top-[15%] left-[10%] text-4xl floating-element stagger-1">😊</span>
        <span className="absolute top-[25%] right-[15%] text-3xl floating-element stagger-2">😊</span>
        <span className="absolute top-[60%] left-[8%] text-5xl floating-element stagger-3">😊</span>
        <span className="absolute bottom-[30%] right-[10%] text-4xl floating-element stagger-4">😊</span>
        <span className="absolute top-[45%] left-[25%] text-3xl floating-element stagger-5">😊</span>
        <span className="absolute bottom-[20%] left-[40%] text-3xl floating-element stagger-1">😊</span>
        <span className="absolute top-[70%] right-[25%] text-4xl floating-element stagger-2">😊</span>
        
        {/* Stars */}
        <span className="absolute top-[20%] left-[20%] text-white text-2xl floating-element stagger-2">✦</span>
        <span className="absolute top-[10%] left-[35%] text-white text-xl floating-element stagger-3">✧</span>
        <span className="absolute top-[30%] right-[30%] text-white text-3xl floating-element stagger-1">✦</span>
        <span className="absolute bottom-[40%] left-[15%] text-white text-xl floating-element stagger-4">✧</span>
        <span className="absolute top-[50%] right-[8%] text-white text-2xl floating-element stagger-5">✦</span>
        
        {/* Flower decorations */}
        <div className="absolute top-[40%] left-[5%] text-5xl floating-element stagger-2">🌸</div>
        <div className="absolute bottom-[25%] right-[5%] text-5xl floating-element stagger-4">🌸</div>
      </div>

      {/* Main content */}
      <div
        className={`
          relative z-10 text-center px-4
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
      >
        {/* Main title with retro pink style */}
        <h1 className="retro-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
          YEAR<span className="italic font-normal opacity-80">of</span>LOVE
        </h1>

        {/* Subtitle */}
        <p className="text-gray-800 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-clean">
          Great things happen when you discover the moments that are made for you, 
          take the first step and see where it leads.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToTimeline}
          className="btn-pill inline-flex items-center gap-3 text-gray-800 hover:text-pink-600"
        >
          <span>Explore Our Journey</span>
          <span className="text-pink-500 text-xl">❤️</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToTimeline}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300 focus:outline-none"
        aria-label="Scroll to timeline"
      >
        <div className="flex flex-col items-center animate-bounce">
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default Hero;
