
import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  shortDescription: z.string()
    .min(1, 'Deskripsi singkat harus diisi')
    .max(120, 'Deskripsi singkat maksimal 120 karakter'),
  longDescription: z.string()
    .min(1, 'Deskripsi lengkap harus diisi')
    .min(200, 'Deskripsi lengkap minimal 200 kata')
    .max(300, 'Deskripsi lengkap maksimal 300 kata'),
  price: z.number().optional(),
  imageUrl: z.string().url('URL gambar harus valid').or(z.string().min(1, 'URL gambar harus diisi')),
  category: z.string().min(1, 'Kategori harus dipilih'),
  features: z.array(
    z.object({
      title: z.string().min(1, 'Nama fitur harus diisi'),
      description: z.string()
        .min(1, 'Deskripsi fitur harus diisi')
        .min(50, 'Deskripsi fitur minimal 50 kata')
        .max(80, 'Deskripsi fitur maksimal 80 kata'),
      price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
      serviceType: z.string().min(1, 'Tipe layanan harus dipilih'),
      category: z.string().min(1, 'Kategori harus dipilih')
    })
  ).min(1, 'Minimal satu fitur harus diisi'),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
