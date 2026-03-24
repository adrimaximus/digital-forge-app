
import React, { useEffect, useRef } from 'react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroCard: React.FC = () => {
  const isMobile = useIsMobile();
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    
    // Simple text display with the requested content
    element.innerHTML = 'Digitally Create Your Customer';
    element.className = 'interactive-text italic font-bold text-yellow-400';
  }, []);
  
  return (
    <div className="relative z-10 glass-morphism rounded-2xl p-4 border border-yellow-400/20 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400/20 to-amber-500/10 flex items-center justify-center">
        {/* Modern texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <pattern id="dots" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-yellow-400/30" />
            <rect width="100%" height="100%" fill="url(#dots)" className="text-yellow-400/20" />
          </svg>
        </div>
        
        {/* Content container with proper spacing */}
        <div className="w-[90%] max-w-[90%] mx-auto flex flex-col items-center justify-center h-full py-4 sm:py-6">
          {/* Logo at the top - made larger */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <Logo size="large" />
          </div>
          
          {/* Text content */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap overflow-hidden">
              <div ref={textRef} className=""></div>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-prose">
              Ciptakan customer Anda dengan solusi digital yang terintegrasi dan didukung teknologi AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
