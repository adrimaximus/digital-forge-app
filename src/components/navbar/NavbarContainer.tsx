
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavbarContainerProps {
  children: React.ReactNode;
  isMenuOpen?: boolean;
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ children, isMenuOpen = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Navigate to hash section if coming from another page
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Always apply glass-morphism effect when scrolled OR menu is open
  // But when menu is open, add an additional non-transparent background
  const applyGlassMorphism = isScrolled || isMenuOpen;
  const menuOpenClass = isMenuOpen ? 'bg-slate-900' : '';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${applyGlassMorphism ? 'glass-morphism py-2' : 'py-4'} ${menuOpenClass}`}>
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
};

export default NavbarContainer;
