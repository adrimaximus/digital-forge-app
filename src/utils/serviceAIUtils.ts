import { callOpenAI } from '@/utils/ai';
import { useToast } from '@/hooks/use-toast';

export const useServiceAIUtils = () => {
  const { toast } = useToast();

  const generateProductDescription = async (
    title: string,
    category: string,
    setIsGenerating: (value: boolean) => void,
    setFormValues: (field: string, value: string) => void
  ) => {
    try {
      if (!title) {
        toast({
          title: "Judul diperlukan",
          description: "Harap isi judul layanan terlebih dahulu",
          variant: "destructive",
        });
        return;
      }
      
      setIsGenerating(true);
      
      const prompt = `Buatkan deskripsi singkat (maksimal 120 karakter) dan deskripsi panjang (200-300 kata) untuk layanan digital bernama "${title}" dalam kategori "${category || 'umum'}". Format respons:

[DESKRIPSI_SINGKAT]
deskripsi singkat di sini

[DESKRIPSI_PANJANG]
deskripsi panjang di sini`;

      const response = await callOpenAI(prompt, 0.7);
      
      const shortDescMatch = response.match(/\[DESKRIPSI_SINGKAT\]([\s\S]*?)\n\n/);
      const longDescMatch = response.match(/\[DESKRIPSI_PANJANG\]([\s\S]*)/);
      
      const shortDesc = shortDescMatch ? shortDescMatch[1].trim() : "";
      const longDesc = longDescMatch ? longDescMatch[1].trim() : "";
      
      if (shortDesc) {
        setFormValues('shortDescription', shortDesc);
      }
      
      if (longDesc) {
        setFormValues('longDescription', longDesc);
      }
      
      toast({
        title: "Deskripsi berhasil dibuat",
        description: "Deskripsi produk telah dihasilkan oleh AI",
      });
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Gagal membuat deskripsi",
        description: "Terjadi kesalahan saat menghasilkan deskripsi",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateFeatureDescription = async (
    index: number,
    title: string,
    shortDescription: string,
    featureTitle: string,
    setIsGenerating: (value: boolean) => void,
    setGeneratingIndex: (index: number | null) => void,
    setFeatureDescription: (index: number, description: string) => void
  ) => {
    try {
      if (!featureTitle) {
        toast({
          title: "Judul fitur diperlukan",
          description: "Harap isi judul fitur terlebih dahulu",
          variant: "destructive",
        });
        return;
      }
      
      setIsGenerating(true);
      setGeneratingIndex(index);
      
      const prompt = `Buatkan deskripsi singkat (50-80 kata) untuk fitur "${featureTitle}" dari layanan "${title}" yang ${shortDescription ? `memiliki deskripsi singkat: "${shortDescription}".` : 'adalah layanan digital.'} 
      
Deskripsi harus:
1. Menjelaskan manfaat konkret fitur bagi pengguna
2. Menggunakan bahasa yang persuasif dan informatif
3. Fokus pada nilai yang diberikan
4. Sebutkan contoh penggunaan jika relevan`;

      const response = await callOpenAI(prompt, 0.7);
      
      setFeatureDescription(index, response.trim());
      
      toast({
        title: "Deskripsi fitur berhasil dibuat",
        description: "Deskripsi fitur telah dihasilkan oleh AI",
      });
    } catch (error) {
      console.error("Error generating feature description:", error);
      toast({
        title: "Gagal membuat deskripsi fitur",
        description: "Terjadi kesalahan saat menghasilkan deskripsi fitur",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setGeneratingIndex(null);
    }
  };

  return {
    generateProductDescription,
    generateFeatureDescription
  };
};
