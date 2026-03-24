
import React from 'react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { CatalogFeature } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCatalog } from '../CatalogContext';
import { useToast } from '@/hooks/use-toast';

interface CatalogDetailFeaturesProps {
  features: CatalogFeature[];
  catalogId: string;
  catalogTitle: string;
}

const CatalogDetailFeatures: React.FC<CatalogDetailFeaturesProps> = ({ features, catalogId, catalogTitle }) => {
  const { addToCart } = useCatalog();
  const { toast } = useToast();

  const handleAddFeatureToCart = (feature: CatalogFeature) => {
    if (!feature.price) return;
    
    try {
      // Create a feature as a cart item
      const featureAsItem = {
        id: `${catalogId}-feature-${feature.title.replace(/\s+/g, '-').toLowerCase()}`,
        title: `${catalogTitle} - ${feature.title}`,
        description: feature.description,
        longDescription: '',
        price: feature.price,
        category: 'Feature',
        imageUrl: '',
        features: [],
        quantity: 1
      };
      
      addToCart(featureAsItem);
      
      toast({
        title: "Fitur ditambahkan ke keranjang",
        description: `${feature.title} telah ditambahkan ke keranjang Anda`,
      });
    } catch (e) {
      console.error('Error adding feature to cart:', e);
      toast({
        title: "Gagal menambahkan ke keranjang",
        description: "Keranjang penuh, harap kosongkan beberapa item terlebih dahulu",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">Fitur Layanan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <Card key={index} className="p-0 overflow-hidden flex">
            <div className="w-1 bg-yellow-400"></div>
            <div className="p-3 flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm">{feature.title}</h3>
                {feature.price !== undefined && feature.price > 0 && (
                  <span className="text-primary font-bold text-xs">{formatCurrency(feature.price)}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-xs">{feature.description}</p>
                {feature.price !== undefined && feature.price > 0 && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black border-none ml-2 flex-shrink-0 h-6 w-6"
                    onClick={() => handleAddFeatureToCart(feature)}
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CatalogDetailFeatures;
