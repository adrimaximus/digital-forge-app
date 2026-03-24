
import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Bookmark, Edit } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { useCatalog } from './CatalogContext';

type CatalogCardProps = {
  item: CatalogItem;
};

const CatalogCard: React.FC<CatalogCardProps> = ({ item }) => {
  const { toggleBookmark, bookmarks, isAdmin } = useCatalog();
  const isBookmarked = bookmarks.includes(item.id);
  
  return (
    <Link to={`/solusi/${item.id}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col border-none shadow-md bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
        <div className="relative">
          <img 
            src={item.image || item.imageUrl} 
            alt={item.title}
            className="w-full h-40 object-cover"
          />
          
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-2 right-2 rounded-full ${
              isBookmarked 
                ? 'bg-yellow-400 text-black hover:bg-yellow-500 hover:text-black' 
                : 'bg-black/60 text-white hover:bg-black/80'
            } backdrop-blur-sm border-none h-7 w-7`}
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(item.id);
            }}
          >
            <Bookmark className="h-3.5 w-3.5" fill={isBookmarked ? "currentColor" : "none"} />
          </Button>
          
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border-none h-7 w-7"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/solusi/edit/${item.id}`;
              }}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1.5 hover:text-yellow-400 transition-colors line-clamp-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CatalogCard;
