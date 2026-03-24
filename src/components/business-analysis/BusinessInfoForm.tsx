
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const businessInfoSchema = z.object({
  businessName: z.string().min(2, { message: 'Nama bisnis wajib diisi' }),
  productType: z.string().min(2, { message: 'Jenis produk wajib diisi' }),
  numberOfEmployees: z.string({ required_error: 'Jumlah karyawan wajib dipilih' }),
  location: z.string().min(2, { message: 'Lokasi wajib diisi' }),
  contactNumber: z.string().min(5, { message: 'Nomor kontak wajib diisi' }),
  email: z.string().email({ message: 'Email tidak valid' }),
});

export type BusinessInfoData = z.infer<typeof businessInfoSchema>;

interface BusinessInfoFormProps {
  defaultValues: Partial<BusinessInfoData>;
  onNext: (data: BusinessInfoData) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ defaultValues, onNext }) => {
  const form = useForm<BusinessInfoData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      ...defaultValues,
      numberOfEmployees: defaultValues.numberOfEmployees || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nama Bisnis</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Masukkan nama bisnis Anda" 
                  className="bg-slate-700 border-slate-600 text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Jenis Produk/Layanan</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Contoh: Makanan, Konsultan, Fashion" 
                  className="bg-slate-700 border-slate-600 text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="numberOfEmployees"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Jumlah Karyawan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Pilih jumlah karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="1-5">1-5 karyawan</SelectItem>
                  <SelectItem value="6-20">6-20 karyawan</SelectItem>
                  <SelectItem value="21-50">21-50 karyawan</SelectItem>
                  <SelectItem value="51-100">51-100 karyawan</SelectItem>
                  <SelectItem value="101-500">101-500 karyawan</SelectItem>
                  <SelectItem value="500+">Lebih dari 500 karyawan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Lokasi / Alamat</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Alamat atau lokasi bisnis Anda" 
                  className="bg-slate-700 border-slate-600 text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nomor Kontak</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nomor telepon atau WhatsApp" 
                    className="bg-slate-700 border-slate-600 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email Bisnis</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email@perusahaan.com" 
                    type="email" 
                    className="bg-slate-700 border-slate-600 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-4 flex justify-end">
          <Button 
            type="submit" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Lanjut <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessInfoForm;
