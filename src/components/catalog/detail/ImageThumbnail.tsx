
import React from 'react';

interface ImageThumbnailProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
  size?: 'sm' | 'lg';
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  isSelected,
  onClick,
  size = 'lg'
}) => {
  return (
    <div 
      onClick={onClick} 
      className={`
        cursor-pointer transition-all duration-200 rounded-md overflow-hidden aspect-square
        ${isSelected ? 'ring-2 ring-yellow-400' : 'hover:opacity-80'}
        ${size === 'sm' ? 'h-14 w-14 flex-shrink-0' : 'h-16 w-16'}
      `}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default ImageThumbnail;
