import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import FullscreenViewer from './components/FullscreenViewer';

function App() {
  // State for fullscreen image viewer
  const [fullscreenImage, setFullscreenImage] = useState(null);
  
  // Mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lock body scroll when fullscreen is open
  useEffect(() => {
    if (fullscreenImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => document.body.classList.remove('modal-open');
  }, [fullscreenImage]);

  // Handle keyboard events (ESC to close fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  // Open fullscreen image viewer (called from Timeline)
  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  // Close fullscreen viewer
  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero section */}
      <Hero />
      
      {/* Timeline section */}
      <Timeline onImageClick={openFullscreen} />
      
      {/* Footer */}
      <footer className="py-12 text-center bg-gradient-to-b from-white to-sky-100">
        <p className="text-gray-700 font-elegant text-xl italic">
          Made with <span className="text-pink-500">❤️</span> for our 5th anniversary
        </p>
        <p className="text-gray-500 text-sm mt-2 font-clean">
          2020 - 2025
        </p>
      </footer>

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <FullscreenViewer
          image={fullscreenImage}
          onClose={closeFullscreen}
        />
      )}
    </div>
  );
}

export default App;
