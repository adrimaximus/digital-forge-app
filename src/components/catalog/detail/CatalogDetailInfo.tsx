
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';
import { Badge } from '@/components/ui/badge';

interface CatalogDetailInfoProps {
  item: CatalogItem;
  isBookmarked: boolean;
  onAddToCart: () => void;
  onToggleBookmark: () => void;
}

const CatalogDetailInfo: React.FC<CatalogDetailInfoProps> = ({ 
  item, 
  isBookmarked, 
  onAddToCart, 
  onToggleBookmark 
}) => {
  return (
    <div>
      <Card className="p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium text-sm">Deskripsi</h2>
          <div className="flex items-center gap-1">
            <Badge className="border border-yellow-400 text-yellow-400 bg-transparent rounded-lg text-xs py-1">{item.category}</Badge>
            <Button variant="ghost" size="icon" onClick={onToggleBookmark} className="h-7 w-7 p-0">
              {isBookmarked ? (
                <BookmarkCheck className="h-3 w-3 text-primary" />
              ) : (
                <Bookmark className="h-3 w-3" />
              )}
              <span className="sr-only">{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
        <p className="text-muted-foreground text-sm">{item.longDescription}</p>
      </Card>
    </div>
  );
};

export default CatalogDetailInfo;
