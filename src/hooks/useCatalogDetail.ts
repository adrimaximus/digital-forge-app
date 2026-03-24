
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '@/components/catalog/CatalogContext';
import { useToast } from '@/hooks/use-toast';
import { CatalogItem } from '@/types/catalog';

export const useCatalogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleBookmark, bookmarks, isAdmin, items } = useCatalog();
  const [item, setItem] = useState<CatalogItem | undefined>(undefined);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const foundItem = items.find(item => item.id === id);
      setItem(foundItem);
    }
  }, [id, items]);
  
  const isBookmarked = item ? bookmarks.includes(item.id) : false;
  
  const handleAddToCart = () => {
    if (!item) return;
    
    try {
      addToCart(item);
      toast({
        title: "Ditambahkan ke keranjang",
        description: `${item.title} telah ditambahkan ke keranjang Anda`,
      });
    } catch (e) {
      console.error('Error adding to cart:', e);
      toast({
        title: "Gagal menambahkan ke keranjang",
        description: "Keranjang penuh, harap kosongkan beberapa item terlebih dahulu",
        variant: "destructive"
      });
    }
  };
  
  const handleToggleBookmark = () => {
    if (!item) return;
    
    toggleBookmark(item.id);
    toast({
      title: isBookmarked ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: `${item.title} telah ${isBookmarked ? 'dihapus dari' : 'ditambahkan ke'} favorit Anda`,
    });
  };

  return {
    item,
    isBookmarked,
    isAdmin,
    handleAddToCart,
    handleToggleBookmark
  };
};
