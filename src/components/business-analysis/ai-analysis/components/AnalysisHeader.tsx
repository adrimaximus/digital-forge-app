
import React, { useState } from 'react';
import { Bot, Download, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessData } from '@/utils/ai/types';
import { exportAnalysisToPDF } from '@/utils/pdfExport';
import { toast } from "sonner";

interface AnalysisHeaderProps {
  businessData?: BusinessData;
  aiAnalysis?: string;
  recommendedServices?: string[];
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ 
  businessData,
  aiAnalysis,
  recommendedServices
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    try {
      setIsDownloading(true);
      console.log("Downloading PDF from AnalysisHeader");
      
      if (businessData && aiAnalysis) {
        // Clean any paragraph labels before sending to PDF generator
        const cleanedAnalysis = aiAnalysis.replace(/\[PARAGRAF \d+\]\s*/gi, "");
        
        exportAnalysisToPDF(businessData, cleanedAnalysis, recommendedServices);
        toast.success("PDF berhasil didownload");
      } else {
        console.error("Missing data for PDF download in AnalysisHeader");
        toast.error("Data tidak lengkap untuk mengunduh PDF");
      }
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Gagal mendownload PDF. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 animate-in slide-in-from-left duration-300">
      <div className="flex items-center gap-2 text-yellow-400">
        <Bot className="h-5 w-5" />
        <span className="font-semibold text-base">Hasil Analisis AI</span>
      </div>
      
      {businessData && aiAnalysis && (
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-1" />
          )} 
          PDF
        </Button>
      )}
    </div>
  );
};

export default AnalysisHeader;
