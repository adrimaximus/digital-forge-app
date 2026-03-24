
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  initialIndex?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt,
  initialIndex = 0
}) => {
  const [selectedImage, setSelectedImage] = useState(initialIndex);
  const isMobile = useIsMobile();

  const handleSlideChange = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="flex flex-col h-auto w-full relative">
      {/* Main image container with 16:9 aspect ratio */}
      <div className="relative bg-black/5 rounded-lg overflow-hidden w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          orientation="horizontal"
          onSlideChange={handleSlideChange}
        >
          <CarouselContent>
            {images.map((image, i) => (
              <CarouselItem key={i}>
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={image} 
                    alt={`${alt} - image ${i + 1}`} 
                    className="w-full h-full transition-opacity duration-300 object-cover" 
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation dots positioned absolutely at the bottom of the image */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(i)} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200", 
                  selectedImage === i 
                    ? "bg-yellow-400 scale-110" 
                    : "bg-gray-300 hover:bg-gray-400 bg-opacity-70"
                )} 
                aria-label={`View image ${i + 1}`} 
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ImageGallery;
