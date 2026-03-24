
import React, { useEffect, useRef, useState } from 'react';
import HeroCanvas from './HeroCanvas';
import HeroContent from './HeroContent';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set up canvas dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative overflow-hidden min-h-screen flex items-center pt-16 bg-background"
    >
      {/* Canvas for the animated network */}
      <HeroCanvas dimensions={dimensions} mousePosition={mousePosition} />

      {/* Static background light effects */}
      <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-yellow-400/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-400/10 rounded-full blur-[100px]"></div>

      <HeroContent />
    </section>
  );
};

export default Hero;
