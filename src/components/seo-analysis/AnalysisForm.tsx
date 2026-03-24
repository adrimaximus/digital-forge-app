
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export interface FormData {
  keyword: string;
  websiteUrl: string;
  industry: string;
  targetAudience: string;
  analysisType: string;
  additionalInfo: string;
}

interface AnalysisFormProps {
  formData: FormData;
  isLoading: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRadioChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
  formData,
  isLoading,
  onFormChange,
  onRadioChange,
  onSubmit
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Analisis</CardTitle>
        <CardDescription>
          Isi data berikut untuk mendapatkan analisis SEO & Trend yang akurat dengan AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="keyword">Keyword Utama</Label>
              <Input 
                id="keyword"
                name="keyword"
                placeholder="Masukkan keyword utama produk Anda"
                value={formData.keyword}
                onChange={onFormChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="websiteUrl">Website URL (opsional)</Label>
              <Input 
                id="websiteUrl"
                name="websiteUrl"
                placeholder="https://website-anda.com"
                value={formData.websiteUrl}
                onChange={onFormChange}
              />
            </div>
            
            <div>
              <Label htmlFor="industry">Industri</Label>
              <Input 
                id="industry"
                name="industry"
                placeholder="Contoh: Fashion, F&B, Teknologi"
                value={formData.industry}
                onChange={onFormChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input 
                id="targetAudience"
                name="targetAudience"
                placeholder="Contoh: Pria 25-35 tahun di Jakarta"
                value={formData.targetAudience}
                onChange={onFormChange}
                required
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Jenis Analisis</Label>
              <RadioGroup 
                value={formData.analysisType} 
                onValueChange={onRadioChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic">Basic - Keyword dan tren dasar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comprehensive" id="comprehensive" />
                  <Label htmlFor="comprehensive">Komprehensif - Termasuk analisis kompetitor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced - Detail lengkap dengan rekomendasi</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="additionalInfo">Informasi Tambahan (opsional)</Label>
              <Textarea 
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Berikan informasi tambahan yang mungkin membantu analisis"
                value={formData.additionalInfo}
                onChange={onFormChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menganalisis dengan AI...
              </>
            ) : "Analisis Sekarang"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnalysisForm;
