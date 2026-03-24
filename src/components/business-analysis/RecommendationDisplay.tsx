
import React, { useState } from 'react';
import { CheckCircle2, FileText, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportAnalysisToPDF } from '@/utils/pdfExport';
import { BusinessData } from '@/utils/ai/types';
import { toast } from "sonner";

interface RecommendationDisplayProps {
  services: string[];
  businessData?: BusinessData;
  aiAnalysis?: string;
  hideExportButton?: boolean;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ 
  services, 
  businessData, 
  aiAnalysis,
  hideExportButton = false
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleExportPDF = () => {
    try {
      setIsDownloading(true);
      console.log("Exporting PDF from RecommendationDisplay");
      
      if (businessData && aiAnalysis) {
        // Clean any paragraph labels before sending to PDF generator
        const cleanedAnalysis = aiAnalysis.replace(/\[PARAGRAF \d+\]\s*/gi, "");
        
        exportAnalysisToPDF(businessData, cleanedAnalysis, services);
        toast.success("PDF berhasil didownload");
      } else {
        console.error("Missing data for PDF export in RecommendationDisplay");
        toast.error("Data tidak lengkap untuk mengunduh PDF");
      }
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Gagal mendownload PDF. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-white">Layanan yang Direkomendasikan:</h4>
        {!hideExportButton && businessData && aiAnalysis && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-yellow-400/30 hover:bg-yellow-400/10"
            onClick={handleExportPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader size={14} className="mr-1 animate-spin" />
            ) : (
              <FileText size={14} className="mr-1" />
            )} 
            Export PDF
          </Button>
        )}
      </div>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="mr-2 h-4 w-4 text-yellow-400 mt-0.5" />
            <span className="text-white">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationDisplay;
