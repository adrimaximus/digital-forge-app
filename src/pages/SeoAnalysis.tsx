import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '@/components/seo-analysis/OverviewTab';
import AnalysisForm, { FormData } from '@/components/seo-analysis/AnalysisForm';
import ResultsTab from '@/components/seo-analysis/ResultsTab';
import { callOpenAI, getTrendDataFromOpenAI, getCompetitorDataFromOpenAI, getPlatformDataFromOpenAI } from '@/utils/ai';
import { TrendingUp } from 'lucide-react';

const TrendIcon = () => (
  <TrendingUp className="inline h-6 w-6 mr-2 text-yellow-400" />
);

const SeoAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [analysisResults, setAnalysisResults] = useState<string | null>(null);
  const [trendData, setTrendData] = useState<any>(null);
  const [competitorData, setCompetitorData] = useState<any>(null);
  const [platformData, setPlatformData] = useState<any>(null);
  const [citations, setCitations] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    keyword: '',
    websiteUrl: '',
    industry: '',
    targetAudience: '',
    analysisType: 'comprehensive',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, analysisType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const prompt = buildSeoAnalysisPrompt(formData);
      
      const creativityLevel = formData.analysisType === 'basic' ? 0.3 : 
                            formData.analysisType === 'comprehensive' ? 0.5 : 0.7;
      
      const [results, trendResult, competitorResult, platformResult] = await Promise.all([
        callOpenAI(prompt, creativityLevel),
        getTrendDataFromOpenAI(formData.keyword, formData.industry),
        getCompetitorDataFromOpenAI(formData.keyword, formData.industry),
        getPlatformDataFromOpenAI(formData.keyword, formData.industry)
      ]);
      
      setAnalysisResults(results);
      setTrendData(trendResult);
      setCompetitorData(competitorResult);
      setPlatformData(platformResult);
      
      const allCitations = [
        ...(trendResult.citations || []),
        ...(competitorResult.citations || []),
        ...(platformResult.citations || [])
      ];
      setCitations(allCitations);
      
      setActiveTab("results");
      toast({
        title: "Analisis selesai",
        description: "Hasil analisis SEO & Social Trend telah siap",
      });
    } catch (error) {
      console.error("Error analyzing SEO data:", error);
      toast({
        title: "Gagal melakukan analisis",
        description: "Terjadi kesalahan saat menganalisis data. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buildSeoAnalysisPrompt = (data: FormData) => {
    return `Lakukan analisis SEO dan Social Trend untuk:
    
Keyword: ${data.keyword}
Website: ${data.websiteUrl || "Tidak ada"}
Industri: ${data.industry}
Target Audience: ${data.targetAudience}
Jenis Analisis: ${data.analysisType}
Informasi Tambahan: ${data.additionalInfo || "Tidak ada"}

Berikan analisis yang komprehensif meliputi:
1. Potensi keyword di pencarian
2. Tren popularitas dalam 3 bulan terakhir
3. Visibilitas di media sosial
4. Prediksi tren selanjutnya
5. Rekomendasi strategi SEO dan social media
6. Data spesifik tentang volume pencarian keyword dan persaingan

Gunakan bahasa Indonesia yang profesional dan konkret (bukan umum). Berikan angka-angka spesifik tentang tren pencarian dan sosial media berdasarkan data yang akurat.

Sertakan referensi atau sumber data yang relevan dan terkini untuk mendukung analisis.`;
  };

  const handleStartAnalysis = () => {
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 mt-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center pt-8 flex items-center justify-center">
            <TrendIcon />
            Trend Analysis
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Dapatkan insight dan trend terkini yang relevan dengan produk Anda
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="form">Form Analisis</TabsTrigger>
              <TabsTrigger value="results" disabled={activeTab !== "results"}>Hasil Analisis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab onStartAnalysis={handleStartAnalysis} />
            </TabsContent>

            <TabsContent value="form">
              <AnalysisForm 
                formData={formData}
                isLoading={isLoading}
                onFormChange={handleChange}
                onRadioChange={handleRadioChange}
                onSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="results">
              <ResultsTab 
                formData={formData} 
                analysisResults={analysisResults} 
                trendData={trendData}
                competitorData={competitorData}
                platformData={platformData}
                citations={citations}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
};

export default SeoAnalysis;
