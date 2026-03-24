
import { useState, useEffect } from 'react';
import { CatalogItem } from '@/types/catalog';
import { safeStorage } from '../utils/storageUtils';

export const useCatalogFilters = (items: CatalogItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const storedViewMode = safeStorage.getItem('catalogViewMode');
    if (storedViewMode) {
      setViewMode(storedViewMode as 'grid' | 'list');
    }
  }, []);

  useEffect(() => {
    safeStorage.setItem('catalogViewMode', viewMode);
  }, [viewMode]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    filteredItems
  };
};
