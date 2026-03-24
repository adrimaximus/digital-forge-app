
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  href: string;
  name: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, name, icon, onClick }) => {
  const location = useLocation();
  const isCurrentPath = location.pathname === href;
  
  // For hash links like #services, check if we're on the home page AND the hash matches
  const isCurrentHash = href.startsWith('#') && 
    location.pathname === '/' && 
    location.hash === href;
  
  const isActive = isCurrentPath || isCurrentHash;
  
  // Common active class styling
  const activeClass = isActive ? 'text-yellow-400 font-medium' : 'text-gray-300 hover:text-white';
  
  // Determine if this should be an internal link or hash link
  const isInternalLink = !href.startsWith('#');
  
  if (isInternalLink) {
    return (
      <li>
        <Link 
          to={href} 
          className={`transition-colors flex items-center ${activeClass}`}
          onClick={onClick}
        >
          {icon}
          {name}
        </Link>
      </li>
    );
  }
  
  return (
    <li>
      <a 
        href={href} 
        className={`transition-colors flex items-center ${activeClass}`}
        onClick={(e) => {
          // Handle hash navigation based on current location
          if (location.pathname !== '/') {
            // If not on homepage, navigate to homepage first, then to the hash section
            window.location.href = '/' + href;
            e.preventDefault();
          } else if (onClick) {
            onClick();
          }
        }}
      >
        {icon}
        {name}
      </a>
    </li>
  );
};

export default NavItem;
