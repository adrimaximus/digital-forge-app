
import React from 'react';
import { useCatalogDetail } from '@/hooks/useCatalogDetail';
import CatalogDetailHeader from './CatalogDetailHeader';
import CatalogDetailImage from './CatalogDetailImage';
import CatalogDetailInfo from './CatalogDetailInfo';
import CatalogDetailFeatures from './CatalogDetailFeatures';
import CatalogItemNotFound from './CatalogItemNotFound';

const CatalogDetailContent: React.FC = () => {
  const { item, isBookmarked, isAdmin, handleAddToCart, handleToggleBookmark } = useCatalogDetail();
  
  if (!item) {
    return <CatalogItemNotFound />;
  }
  
  return (
    <div className="container mx-auto px-4 py-4">
      <CatalogDetailHeader item={item} isAdmin={isAdmin} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CatalogDetailImage item={item} />
        </div>
        
        <div className="flex flex-col">
          {/* Title back to white color and 10% larger */}
          <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
          
          <CatalogDetailInfo 
            item={item} 
            isBookmarked={isBookmarked}
            onAddToCart={handleAddToCart}
            onToggleBookmark={handleToggleBookmark}
          />
          
          <CatalogDetailFeatures 
            features={item.features}
            catalogId={item.id}
            catalogTitle={item.title}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogDetailContent;
