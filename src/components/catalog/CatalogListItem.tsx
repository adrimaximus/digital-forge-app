
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Edit } from 'lucide-react';
import { useCatalog } from './CatalogContext';
import { CatalogItem } from '@/types/catalog';
import { formatCurrency } from '@/utils/formatters';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface CatalogListItemProps {
  item: CatalogItem;
}

const CatalogListItem: React.FC<CatalogListItemProps> = ({ item }) => {
  const { addToCart, toggleBookmark, bookmarks, isAdmin } = useCatalog();
  const { toast } = useToast();
  const isBookmarked = bookmarks.includes(item.id);
  const isMobile = useIsMobile();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${item.title} telah ditambahkan ke keranjang Anda`,
    });
  };
  
  const handleToggleBookmark = () => {
    toggleBookmark(item.id);
    toast({
      title: isBookmarked ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: `${item.title} telah ${isBookmarked ? 'dihapus dari' : 'ditambahkan ke'} favorit Anda`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200/10 hover:translate-y-[-2px]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Badge 
                className="inline-block mr-2 text-xs font-medium rounded-full px-2 py-0.5 bg-black/60 text-white border-none"
              >
                {item.category}
              </Badge>
              <Link to={`/solusi/${item.id}`}>
                <h3 className="font-semibold text-lg mt-2 hover:text-yellow-400 transition-colors">{item.title}</h3>
              </Link>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleToggleBookmark}
                className={`h-8 w-8 rounded-full ${isBookmarked ? 'text-yellow-400' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400' : ''}`} />
              </Button>
              
              {isAdmin && (
                <Link to={`/solusi/edit/${item.id}`}>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm my-2 flex-grow">{item.description}</p>
          
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold text-lg text-yellow-400">
              {item.price > 0 ? formatCurrency(item.price) : "Free"}
            </div>
            
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CatalogListItem;
