
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  // Load categories from localStorage
  useEffect(() => {
    const loadCategories = () => {
      try {
        const storedCategories = localStorage.getItem('serviceCategories');
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          if (Array.isArray(parsedCategories)) {
            setCategories(parsedCategories);
          }
        } else {
          // Get categories from catalog items if no stored categories exist
          const storedServices = localStorage.getItem('catalogItems');
          if (storedServices) {
            const parsedServices = JSON.parse(storedServices);
            const uniqueCategories = Array.from(
              new Set(
                Array.isArray(parsedServices) 
                  ? parsedServices.map(service => service.category)
                  : []
              )
            ).filter(Boolean) as string[];
            
            setCategories(uniqueCategories);
            // Store the initial categories
            localStorage.setItem('serviceCategories', JSON.stringify(uniqueCategories));
          }
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        toast({
          title: "Error loading categories",
          description: "Failed to load category data",
          variant: "destructive"
        });
      }
    };
    
    loadCategories();
  }, [toast]);

  const addCategory = (newCategory: string) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('serviceCategories', JSON.stringify(updatedCategories));
    updateCategoriesInCatalog(updatedCategories);
  };

  const editCategory = (oldCategory: string, newCategory: string) => {
    const updatedCategories = categories.map(cat => 
      cat === oldCategory ? newCategory : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem('serviceCategories', JSON.stringify(updatedCategories));
    updateCategoryName(oldCategory, newCategory);
  };

  const deleteCategory = (categoryToDelete: string) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem('serviceCategories', JSON.stringify(updatedCategories));
    updateDeletedCategory(categoryToDelete);
  };

  // Update all catalog items with new category list
  const updateCategoriesInCatalog = (updatedCategories: string[]) => {
    try {
      // This function just ensures the categories list is updated
      // We don't need to modify the actual catalog items here
      localStorage.setItem('serviceCategories', JSON.stringify(updatedCategories));
    } catch (error) {
      console.error("Error updating categories in catalog:", error);
    }
  };

  // Update the category name in all catalog items
  const updateCategoryName = (oldCategory: string, newCategory: string) => {
    try {
      const storedServices = localStorage.getItem('catalogItems');
      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);
        
        if (Array.isArray(parsedServices)) {
          const updatedServices = parsedServices.map(service => {
            if (service.category === oldCategory) {
              return { ...service, category: newCategory };
            }
            return service;
          });
          
          localStorage.setItem('catalogItems', JSON.stringify(updatedServices));
          updateCategoriesInCatalog(
            categories.map(cat => cat === oldCategory ? newCategory : cat)
          );
        }
      }
    } catch (error) {
      console.error("Error updating category name in catalog items:", error);
    }
  };

  // Update items with deleted category to "Lainnya"
  const updateDeletedCategory = (deletedCategory: string) => {
    try {
      const storedServices = localStorage.getItem('catalogItems');
      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);
        
        if (Array.isArray(parsedServices)) {
          const updatedServices = parsedServices.map(service => {
            if (service.category === deletedCategory) {
              return { ...service, category: "Lainnya" };
            }
            return service;
          });
          
          localStorage.setItem('catalogItems', JSON.stringify(updatedServices));
          updateCategoriesInCatalog(categories.filter(cat => cat !== deletedCategory));
        }
      }
    } catch (error) {
      console.error("Error updating deleted category in catalog items:", error);
    }
  };

  return {
    categories,
    addCategory,
    editCategory,
    deleteCategory
  };
};
