import { useEffect, useState, useMemo } from 'react';

const FloatingHearts = ({ mousePosition }) => {
  const [isActive, setIsActive] = useState(false);

  // Delay animation start
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate random floating elements
  const floatingElements = useMemo(() => {
    const emojis = ['❤️', '💕', '💖', '💗', '✨', '⭐', '🌸'];
    const count = 12;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 18 + Math.random() * 12,
      size: 18 + Math.random() * 20,
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {floatingElements.map((element) => (
        <span
          key={element.id}
          className="absolute animate-float-up opacity-60"
          style={{
            left: `${element.left}%`,
            bottom: '-50px',
            fontSize: `${element.size}px`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`,
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          {element.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
