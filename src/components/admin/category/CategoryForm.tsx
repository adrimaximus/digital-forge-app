
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CategoryFormProps {
  categories: string[];
  onAddCategory: (category: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categories, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Nama kategori diperlukan",
        description: "Masukkan nama kategori untuk menambahkannya.",
        variant: "destructive"
      });
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast({
        title: "Kategori sudah ada",
        description: `Kategori "${newCategory}" sudah ada dalam daftar.`,
        variant: "destructive"
      });
      return;
    }

    onAddCategory(newCategory.trim());
    setNewCategory("");
    
    toast({
      title: "Kategori berhasil ditambahkan",
      description: `Kategori "${newCategory}" telah ditambahkan.`
    });
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Tambah Kategori Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Input
            placeholder="Nama kategori baru"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="bg-slate-950 border-slate-700"
          />
          <Button onClick={handleAddCategory} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Tambah</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
