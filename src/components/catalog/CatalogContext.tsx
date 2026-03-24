
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CatalogItem } from '@/types/catalog';
import { CatalogContextType } from './types/catalogContextTypes';
import { safeStorage } from './utils/storageUtils';
import { useCartOperations } from './hooks/useCartOperations';
import { useBookmarks } from './hooks/useBookmarks';
import { useCatalogFilters } from './hooks/useCatalogFilters';
import servicesData from '@/data/ServicesData';

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart } = useCartOperations();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { 
    searchTerm, setSearchTerm, 
    selectedCategory, setSelectedCategory, 
    viewMode, setViewMode, 
    filteredItems 
  } = useCatalogFilters(items);

  // Load catalog items from localStorage or initialize with default services
  useEffect(() => {
    const storedItems = localStorage.getItem('catalogItems');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error('Error parsing stored catalog items:', error);
        convertAndSetServicesData(); // Fallback to default data
      }
    } else {
      convertAndSetServicesData(); // Initialize with default data
    }
    
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin' || userRole === 'master_admin');
  }, []);
  
  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('catalogItems', JSON.stringify(items));
    }
  }, [items]);

  // Convert services data to catalog item format
  const convertAndSetServicesData = () => {
    // Filter out the hidden services first
    const visibleServicesData = servicesData.filter(service => {
      const title = service.title.toLowerCase();
      return !title.includes('business intelligence') && 
             !title.includes('cyber') && 
             !title.includes('cloud');
    });
    
    const catalogItems: CatalogItem[] = visibleServicesData.map((service, index) => ({
      id: (index + 1).toString(),
      title: service.title,
      description: service.description,
      longDescription: `${service.description} Our team of experts will help you implement and optimize this solution for your specific business needs.`,
      price: 2500000 + (index * 500000), // Example pricing
      category: getCategoryFromTitle(service.title),
      imageUrl: getImageForService(service.title),
      features: service.features.map(feature => ({
        title: feature.name,
        description: feature.description,
        price: 2500000 + (Math.random() * 1000000)
      }))
    }));
    
    setItems(catalogItems);
    // Store converted items
    localStorage.setItem('catalogItems', JSON.stringify(catalogItems));
  };
  
  // Helper function to determine category based on service title
  const getCategoryFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('seo') || titleLower.includes('analysis') || titleLower.includes('trend')) {
      return 'Analisis';
    } else if (titleLower.includes('website') || titleLower.includes('ai')) {
      return 'Produktivitas';
    } else if (titleLower.includes('chat') || titleLower.includes('omnichat')) {
      return 'Komunikasi';
    } else if (titleLower.includes('sistem') || titleLower.includes('portal') || titleLower.includes('business')) {
      return 'Manajemen';
    } else if (titleLower.includes('marketing') || titleLower.includes('digital')) {
      return 'Pemasaran';
    } else {
      return 'Produktivitas'; // Default category
    }
  };
  
  // Helper function to get image URL based on title
  const getImageForService = (title: string): string => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('seo') || titleLower.includes('trend')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('website') || titleLower.includes('ai')) {
      return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('chat') || titleLower.includes('omnichat')) {
      return 'https://images.unsplash.com/photo-1635603388087-f3a94f7c6f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('cyber') || titleLower.includes('security')) {
      return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('marketing')) {
      return 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('cloud') || titleLower.includes('migration')) {
      return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('portal') || titleLower.includes('business')) {
      return 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else if (titleLower.includes('intelligence') || titleLower.includes('tools')) {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    } else {
      return 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <CatalogContext.Provider value={{
      items,
      filteredItems,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      viewMode,
      setViewMode,
      addToCart,
      cart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      bookmarks,
      toggleBookmark,
      isAdmin,
    }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
