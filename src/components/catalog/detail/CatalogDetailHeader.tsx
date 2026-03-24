
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';

interface CatalogDetailHeaderProps {
  item: CatalogItem;
  isAdmin: boolean;
}

const CatalogDetailHeader: React.FC<CatalogDetailHeaderProps> = ({ item, isAdmin }) => {
  return (
    <div className="mb-4 mt-16">
      <div className="flex items-center space-x-2 mb-3">
        <Link to="/catalog">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Kembali ke Katalog
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        {/* Title removed from here and will be positioned in CatalogDetailContent */}
        
        {isAdmin && (
          <Link to={`/catalog/edit/${item.id}`}>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CatalogDetailHeader;
