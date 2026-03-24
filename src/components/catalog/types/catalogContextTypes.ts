
import { CatalogItem, CartItem } from '@/types/catalog';

export interface CatalogContextType {
  items: CatalogItem[];
  filteredItems: CatalogItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  addToCart: (item: CatalogItem) => void;
  cart: CartItem[];
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  bookmarks: string[];
  toggleBookmark: (itemId: string) => void;
  isAdmin: boolean;
}
