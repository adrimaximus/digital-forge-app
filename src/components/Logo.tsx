
import React from 'react';
import { Link } from 'react-router-dom';

type LogoSize = 'default' | 'large';

interface LogoProps {
  size?: LogoSize;
}

const Logo: React.FC<LogoProps> = ({ size = 'default' }) => {
  const logoClasses = size === 'large' 
    ? "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
    : "w-8 h-8 md:w-9 md:h-9";
  
  const textClasses = size === 'large'
    ? "text-xl md:text-2xl lg:text-3xl font-bold text-white"
    : "text-lg md:text-xl font-bold text-white";

  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/b0f2f127-66ca-431f-ace4-3aad2575d667.png" 
        alt="Betterworks Logo" 
        className={logoClasses}
      />
      <span className={textClasses}>betterworks<span className="text-yellow-400">.id</span></span>
    </Link>
  );
};

export default Logo;
