
import React, { useState, useCallback } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  name: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ name }) => {
  const { control, setValue, watch } = useFormContext();
  const currentValue = watch(name);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  const handleFileChange = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Hanya file gambar yang diperbolehkan');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setValue(name, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setValue(name, 'https://source.unsplash.com/random/800x600/?business');
  };
  
  return (
    <FormItem>
      <FormLabel>Gambar Layanan</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {currentValue && (
            <div className="relative">
              <img 
                src={currentValue} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md border border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div
            className={cn(
              "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
              currentValue && "mt-2"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-medium">Klik untuk unggah</span> atau seret dan lepaskan
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG atau GIF hingga 5MB
            </p>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept="image/*"
            />
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ImageUploader;
