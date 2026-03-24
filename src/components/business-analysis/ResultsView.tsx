
import React, { useEffect } from 'react';
import { BusinessData } from '@/utils/ai/types';
import { updateLeadStats } from '@/utils/leadTracker';
import BusinessSummary from './results/BusinessSummary';
import SubmitButton from './results/SubmitButton';
import { cleanupIndonesianText, normalizeLineBreaks } from '@/utils/ai/textCleanup';
import FinalAnalysisBlock from './FinalAnalysisBlock';
import RecommendationDisplay from './RecommendationDisplay';

interface ResultsViewProps {
  formData: {
    businessName: string;
    productType: string;
    numberOfEmployees: string;
    location: string;
    contactNumber: string;
    email: string;
    [key: string]: any;
  };
  recommendedServices: string[];
  aiAnalysisResult: string;
  isAnalyzing: boolean;
  onSubmit: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  formData,
  recommendedServices,
  aiAnalysisResult,
  isAnalyzing,
  onSubmit
}) => {
  // Konversi formData ke BusinessData untuk AIAnalysis
  const businessData: BusinessData = {
    businessName: formData.businessName,
    productType: formData.productType,
    numberOfEmployees: formData.numberOfEmployees,
    location: formData.location,
    contactNumber: formData.contactNumber,
    email: formData.email,
    hasSocialMedia: formData.hasSocialMedia,
    socialMediaPlatforms: formData.socialMediaPlatforms || [],
    hasWebsite: formData.hasWebsite,
    websiteUrl: formData.websiteUrl || "",
    hasDigitalAds: formData.hasDigitalAds,
    challenges: formData.challenges || [],
    otherChallenge: formData.otherChallenge || "",
    aiAnalysis: aiAnalysisResult // Add the full analysis to the businessData
  };

  // Pastikan teks analisis dibersihkan dan dinormalisasi
  const processedAnalysisResult = aiAnalysisResult ? 
    normalizeLineBreaks(cleanupIndonesianText(aiAnalysisResult))
      // Also remove paragraph labels
      .replace(/\[PARAGRAF \d+\]\s*/gi, "") : "";

  useEffect(() => {
    // Log analisis saat komponen dimuat
    if (processedAnalysisResult) {
      console.log("Analysis text available in ResultsView:", 
        processedAnalysisResult.substring(0, 100) + (processedAnalysisResult.length > 100 ? "..." : ""));
    }
  }, [processedAnalysisResult]);

  const handleSubmit = () => {
    // Perbarui statistik lead saat formulir dikirim
    updateLeadStats('business-analysis');
    // Panggil handler onSubmit asli
    onSubmit();
    
    // Kirim acara kustom untuk segera memperbarui statistik di dashboard admin
    const updateEvent = new CustomEvent('statsUpdated');
    window.dispatchEvent(updateEvent);
  };

  return (
    <div className="space-y-6">
      {/* Ringkasan info bisnis */}
      <BusinessSummary formData={formData} />

      {/* Hasil Analisis AI dengan block khusus */}
      <FinalAnalysisBlock 
        businessData={businessData}
        aiAnalysisResult={processedAnalysisResult} 
        isAnalyzing={isAnalyzing}
        recommendedServices={recommendedServices}
      />

      {/* Layanan yang Direkomendasikan - hide export/PDF button */}
      <RecommendationDisplay 
        services={recommendedServices}
        businessData={businessData}
        aiAnalysis={processedAnalysisResult}
        hideExportButton={true}
      />
      
      {/* Tombol Submit */}
      <SubmitButton 
        isAnalyzing={isAnalyzing} 
        onSubmit={handleSubmit}
        businessData={businessData}
        aiAnalysis={processedAnalysisResult}
        recommendedServices={recommendedServices}
      />
    </div>
  );
};

export default ResultsView;
