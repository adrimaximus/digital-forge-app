
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ServiceFeatureForm from "@/components/service-form/ServiceFeatureForm";
import { useToast } from "@/hooks/use-toast";
import { CatalogFeature } from "@/types/catalog";

const featureSchema = z.object({
  title: z.string().min(1, "Judul fitur harus diisi"),
  description: z.string().min(1, "Deskripsi fitur harus diisi"),
  price: z.number().min(0, "Harga tidak boleh negatif"),
});

interface ServiceFeatureEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: CatalogFeature | null;
  serviceId: string;
  onSave: (serviceId: string, updatedFeature: CatalogFeature, originalTitle: string) => void;
}

export function ServiceFeatureEditDialog({
  open,
  onOpenChange,
  feature,
  serviceId,
  onSave,
}: ServiceFeatureEditDialogProps) {
  const { toast } = useToast();
  const form = useForm<CatalogFeature>({
    resolver: zodResolver(featureSchema),
    defaultValues: feature || {
      title: "",
      description: "",
      price: 0,
    },
  });

  const onSubmit = (data: CatalogFeature) => {
    if (!feature) return;
    
    try {
      onSave(serviceId, data, feature.title);
      onOpenChange(false);
      form.reset();
      
      toast({
        title: "Fitur berhasil diperbarui",
        description: "Perubahan telah disimpan",
      });
    } catch (error) {
      toast({
        title: "Gagal memperbarui fitur",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      });
    }
  };

  // Function for onGenerateDescription prop
  const handleGenerateDescription = async () => {
    toast({
      title: "Fitur tidak tersedia",
      description: "Generasi AI tidak tersedia dalam mode edit",
      variant: "default",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Fitur Layanan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ServiceFeatureForm
              index={0}
              isGenerating={false}
              generatingIndex={null}
              onRemoveFeature={() => {}}
              onGenerateDescription={handleGenerateDescription}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
