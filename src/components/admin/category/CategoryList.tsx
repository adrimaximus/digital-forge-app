
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Save, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CategoryListProps {
  categories: string[];
  onEditCategory: (oldCategory: string, newCategory: string) => void;
  onDeleteCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  onEditCategory, 
  onDeleteCategory 
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const { toast } = useToast();

  const handleEditStart = (index: number) => {
    setEditIndex(index);
    setEditValue(categories[index]);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleEditSave = () => {
    if (!editValue.trim()) {
      toast({
        title: "Nama kategori diperlukan",
        description: "Nama kategori tidak boleh kosong.",
        variant: "destructive"
      });
      return;
    }

    if (editIndex !== null) {
      const oldCategory = categories[editIndex];
      onEditCategory(oldCategory, editValue.trim());
      setEditIndex(null);
      
      toast({
        title: "Kategori berhasil diperbarui",
        description: `Kategori telah diubah dari "${oldCategory}" menjadi "${editValue}".`
      });
    }
  };

  const handleDeleteCategory = (index: number) => {
    const categoryToDelete = categories[index];
    
    if (window.confirm(`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete}"? Tindakan ini akan mengubah kategori semua layanan terkait menjadi "Lainnya".`)) {
      onDeleteCategory(categoryToDelete);
      
      toast({
        title: "Kategori berhasil dihapus",
        description: `Kategori "${categoryToDelete}" telah dihapus.`
      });
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Daftar Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="w-[60%]">Nama Kategori</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <TableRow key={index} className="border-slate-700">
                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-slate-950 border-slate-700"
                        autoFocus
                      />
                    ) : (
                      category
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleEditSave}
                          className="px-2 h-8 border-slate-700 hover:bg-slate-700"
                        >
                          <Save size={16} className="mr-1" />
                          Simpan
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleEditCancel}
                          className="px-2 h-8 border-slate-700 hover:bg-slate-700"
                        >
                          <X size={16} className="mr-1" />
                          Batal
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditStart(index)}
                          className="px-2 h-8 border-slate-700 hover:bg-slate-700"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="px-2 h-8 border-red-800 hover:bg-red-900"
                          onClick={() => handleDeleteCategory(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-6 text-slate-400">
                  Tidak ada kategori yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
