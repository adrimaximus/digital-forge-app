
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Loader, Download } from 'lucide-react';
import { BusinessData } from '@/utils/ai/types';
import { exportAnalysisToPDF } from '@/utils/pdfExport';
import { toast } from "sonner";

interface SubmitButtonProps {
  isAnalyzing: boolean;
  onSubmit: () => void;
  businessData?: BusinessData;
  aiAnalysis?: string;
  recommendedServices?: string[];
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isAnalyzing, 
  onSubmit, 
  businessData,
  aiAnalysis,
  recommendedServices 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleButtonClick = () => {
    try {
      setIsDownloading(true);
      console.log("Attempting to download PDF...");
      
      // Export PDF if data is available, using our enhanced PDF generation
      if (businessData && aiAnalysis) {
        // Clean any paragraph labels before sending to PDF generator
        const cleanedAnalysis = aiAnalysis.replace(/\[PARAGRAF \d+\]\s*/gi, "");
        
        // Add analysis to business data for export
        const enhancedBusinessData = {
          ...businessData,
          aiAnalysis: cleanedAnalysis
        };
        
        exportAnalysisToPDF(enhancedBusinessData, cleanedAnalysis, recommendedServices);
        toast.success("PDF berhasil didownload");
        
        // Call the original submit handler to close the form
        onSubmit();
        
        // Kirim acara kustom untuk segera memperbarui statistik di dashboard admin
        const updateEvent = new CustomEvent('statsUpdated');
        window.dispatchEvent(updateEvent);
      } else {
        console.error("Missing data for PDF download:", { 
          hasBusinessData: !!businessData, 
          analysisLength: aiAnalysis?.length || 0 
        });
        toast.error("Data analisis tidak tersedia");
      }
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Gagal mendownload PDF. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="text-center pt-4">
      <Button 
        onClick={handleButtonClick}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-6"
        disabled={isAnalyzing || isDownloading}
      >
        {isAnalyzing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Menganalisis...
          </>
        ) : isDownloading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Mengunduh...
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" /> Download Analisis Bisnis
          </>
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
