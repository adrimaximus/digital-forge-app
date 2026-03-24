
import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CategoryFilterProps } from './types';

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Ensure categories is always an array, even if undefined
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="w-full max-w-[180px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-8 text-xs"
          >
            {selectedCategory || "Semua Kategori"}
            <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0 bg-slate-800 border-slate-600">
          <Command className="bg-transparent">
            <CommandInput placeholder="Cari kategori..." className="h-8 text-xs" />
            <CommandEmpty className="py-2 text-xs">Kategori tidak ditemukan</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              <CommandItem
                onSelect={() => {
                  onCategoryChange("all");
                  setOpen(false);
                }}
                className="text-xs py-1.5 aria-selected:bg-slate-700"
              >
                <Check
                  className={cn(
                    "mr-2 h-3.5 w-3.5",
                    selectedCategory === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
                Semua Kategori
              </CommandItem>
              
              {safeCategories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    onCategoryChange(category);
                    setOpen(false);
                  }}
                  className="text-xs py-1.5 aria-selected:bg-slate-700"
                >
                  <Check
                    className={cn(
                      "mr-2 h-3.5 w-3.5",
                      selectedCategory === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryFilter;
