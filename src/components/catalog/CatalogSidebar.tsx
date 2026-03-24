import React, { useEffect, useState } from 'react';
import { useCatalog } from './CatalogContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Layers,
  BarChart2,
  MessageSquare,
  Users,
  Briefcase,
  FolderClosed,
} from 'lucide-react';

const CatalogSidebar: React.FC = () => {
  const { 
    setSearchTerm, 
    searchTerm, 
    setSelectedCategory, 
    selectedCategory 
  } = useCatalog();
  
  const [categories, setCategories] = useState<string[]>(['Produktivitas', 'Pemasaran', 'Analisis', 'Komunikasi', 'Manajemen']);
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem('serviceCategories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
          setCategories(parsedCategories);
          return;
        }
      }
      
      const storedServices = localStorage.getItem('catalogItems');
      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);
        
        if (Array.isArray(parsedServices)) {
          const uniqueCategories = Array.from(
            new Set(
              parsedServices.map(service => service.category)
            )
          ).filter(Boolean) as string[];
          
          if (uniqueCategories.length > 0) {
            setCategories(uniqueCategories);
            localStorage.setItem('serviceCategories', JSON.stringify(uniqueCategories));
          }
        }
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }, []);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Produktivitas':
        return <Layers className="h-4 w-4" />;
      case 'Pemasaran':
        return <Users className="h-4 w-4" />;
      case 'Analisis':
        return <BarChart2 className="h-4 w-4" />;
      case 'Komunikasi':
        return <MessageSquare className="h-4 w-4" />;
      case 'Manajemen':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <FolderClosed className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="p-4 sticky top-24">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari di sini..."
            className="pl-9 py-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Kategori</h3>
          
          {isMobile ? (
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div 
                ref={scrollContainerRef} 
                className="flex space-x-2 py-2 px-1 overflow-x-auto scrollbar-none touch-pan-x"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category 
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                        : 'border-yellow-400/30 hover:border-yellow-400 text-yellow-400 hover:bg-yellow-400/10'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    <span className="flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2">{category}</span>
                    </span>
                  </Button>
                ))}
              </div>
              <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`w-full justify-start text-left ${
                    selectedCategory === category 
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                      : 'border-yellow-400/30 hover:border-yellow-400 text-yellow-400 hover:bg-yellow-400/10'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  <span className="flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category}</span>
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Template, Aplikasi dan Integrasi</h3>
          <p className="text-sm text-muted-foreground">
            Temukan berbagai solusi untuk kebutuhan bisnis Anda
          </p>
        </div>
        
        {selectedCategory && (
          <Button 
            variant="ghost" 
            className="text-sm text-muted-foreground"
            onClick={() => setSelectedCategory(null)}
          >
            Reset filter
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CatalogSidebar;
