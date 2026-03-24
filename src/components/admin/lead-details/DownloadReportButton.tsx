
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader } from 'lucide-react';
import { BusinessAnalysisLead } from '../leads/types';
import { exportAnalysisToPDF } from '@/utils/pdfExport';
import { toast } from "sonner";

interface DownloadReportButtonProps {
  lead: BusinessAnalysisLead;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ lead }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const downloadReport = () => {
    try {
      setIsDownloading(true);
      console.log("Attempting to download report for:", lead.businessName);
      
      // Check if we have analysis data
      if (!lead.aiAnalysisResult) {
        toast.error("Data analisis tidak tersedia");
        setIsDownloading(false);
        return;
      }
      
      // Convert BusinessAnalysisLead to BusinessData structure for compatibility with exportAnalysisToPDF
      const businessData = {
        businessName: lead.businessName,
        productType: lead.productType,
        numberOfEmployees: lead.numberOfEmployees,
        location: lead.location,
        contactNumber: lead.contactNumber,
        email: lead.email,
        hasSocialMedia: lead.hasSocialMedia,
        socialMediaPlatforms: lead.socialMediaPlatforms,
        hasWebsite: lead.hasWebsite,
        websiteUrl: lead.websiteUrl,
        hasDigitalAds: lead.hasDigitalAds,
        challenges: lead.challenges,
        otherChallenge: lead.otherChallenge,
        aiAnalysis: lead.aiAnalysisResult || ''
      };
      
      // Use the enhanced PDF export function
      exportAnalysisToPDF(
        businessData, 
        // Clean any paragraph labels before sending to PDF generator
        lead.aiAnalysisResult.replace(/\[PARAGRAF \d+\]\s*/gi, "") || 'No analysis available', 
        lead.recommendedServices
      );
      
      toast.success("PDF berhasil didownload");
      
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Gagal mendownload PDF. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <Button
      variant="outline"
      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 mr-2"
      onClick={downloadReport}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FileText className="mr-2 h-4 w-4" />
      )} 
      Download Report
    </Button>
  );
};

export default DownloadReportButton;
