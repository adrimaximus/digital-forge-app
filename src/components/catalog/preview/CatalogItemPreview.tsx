
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { CatalogItem } from '@/types/catalog';

interface CatalogItemPreviewProps {
  data: Partial<CatalogItem>;
}

const CatalogItemPreview: React.FC<CatalogItemPreviewProps> = ({ data }) => {
  // Calculate price range from features
  const getPriceDisplay = () => {
    if (!data.features || data.features.length === 0) {
      return formatCurrency(data.price || 0);
    }
    
    const featurePrices = data.features
      .filter(f => f.price !== undefined && f.price !== null)
      .map(f => f.price as number);
    
    if (featurePrices.length === 0) {
      return formatCurrency(data.price || 0);
    }
    
    const minPrice = Math.min(...featurePrices, data.price || 0);
    const maxPrice = Math.max(...featurePrices);
    
    if (minPrice === maxPrice) {
      return formatCurrency(minPrice);
    }
    
    return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden border-gray-200/10 shadow-md">
      <div className="relative">
        <img 
          src={data.imageUrl || 'https://source.unsplash.com/random/800x600/?business'} 
          alt={data.title || 'Preview Image'} 
          className="w-full h-40 object-cover"
        />
        {data.category && (
          <Badge 
            className="absolute bottom-2 left-2 text-[10px] font-medium rounded-full px-1.5 py-0.5 bg-black text-yellow-400 border border-yellow-400 shadow-sm"
          >
            {data.category}
          </Badge>
        )}
        
        <div className="absolute top-2 left-2 bg-yellow-400 text-black rounded-full p-1">
          <Star className="h-3 w-3 fill-current" />
        </div>
      </div>
      
      <CardContent className="flex-grow pt-3 px-4 pb-2">
        <h3 className="font-semibold text-base leading-tight">
          {data.title || 'Judul Layanan'}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 my-1">
          {data.description || 'Deskripsi layanan akan muncul di sini'}
        </p>
        <p className="font-bold text-lg mt-2 text-yellow-400">
          {getPriceDisplay()}
        </p>
      </CardContent>
      
      <CardFooter className="pt-1 pb-3 px-4 flex justify-between gap-2 mt-auto">
        <Button 
          size="sm"
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Tambahkan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatalogItemPreview;
