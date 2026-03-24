
import React from 'react';
import { CatalogItem } from '@/types/catalog';
import ImageGallery from './ImageGallery';

interface CatalogDetailImageProps {
  item: CatalogItem;
}

const CatalogDetailImage: React.FC<CatalogDetailImageProps> = ({ item }) => {
  // In a real app, this would come from the item's actual images array
  // For now, we're using the same image multiple times as placeholders
  const images = [item.imageUrl, item.imageUrl, item.imageUrl, item.imageUrl]; 
  
  return (
    <div className="w-full">
      <ImageGallery 
        images={images} 
        alt={item.title} 
      />
    </div>
  );
};

export default CatalogDetailImage;
