
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CatalogItem } from '@/types/catalog';
import { CatalogFormFields } from './form/CatalogFormFields';
import { CatalogFormFeatures } from './form/CatalogFormFeatures';
import { CatalogFormActions } from './form/CatalogFormActions';
import CatalogPreviewPanel from './preview/CatalogPreviewPanel';

const formSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  longDescription: z.string().min(1, 'Deskripsi panjang harus diisi'),
  price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
  category: z.string().min(1, 'Kategori harus dipilih'),
  imageUrl: z.string().url('URL gambar harus valid'),
  features: z.array(
    z.object({
      title: z.string().min(1, 'Judul fitur harus diisi'),
      description: z.string().min(1, 'Deskripsi fitur harus diisi'),
    })
  ),
});

interface CatalogFormProps {
  initialData?: CatalogItem;
  onSubmit: (data: any) => void;
}

const CatalogForm: React.FC<CatalogFormProps> = ({ initialData, onSubmit }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      longDescription: '',
      price: 0,
      category: '',
      imageUrl: 'https://source.unsplash.com/random/800x600/?business',
      features: [
        { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
        { title: 'Fitur 2', description: 'Deskripsi fitur 2' }
      ],
    },
    mode: 'onChange', // Enable real-time validation
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      onSubmit(values);
      toast({
        title: "Berhasil",
        description: initialData 
          ? "Layanan berhasil diperbarui" 
          : "Layanan baru berhasil ditambahkan",
      });
      navigate('/catalog');
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <CatalogFormFields />
            <CatalogFormFeatures />
            <CatalogFormActions isEditing={!!initialData} />
          </form>
        </Form>
      </div>
      
      <div className="lg:col-span-1">
        <Form {...form}>
          <CatalogPreviewPanel />
        </Form>
      </div>
    </div>
  );
};

export default CatalogForm;
