
import { BusinessData } from '@/utils/ai/types';
import { formatBusinessDataForReport, generateReportFilename } from './businessDataFormatter';
import { PdfGenerator } from './pdf/pdfGenerator';

export const exportAnalysisToPDF = (
  businessData: BusinessData,
  aiAnalysis: string,
  recommendations?: string[]
) => {
  try {
    // Format the business data for the report
    const { businessInfo, digitalPresence, challenges } = formatBusinessDataForReport(businessData);
    
    // Create a new PDF generator
    const pdfGenerator = new PdfGenerator();
    
    // Page 1: Business information and challenges
    pdfGenerator.addHeader('betterworks.id', 'Laporan Analisis Bisnis');
    
    // Add business information section
    pdfGenerator.addSection('Informasi Bisnis');
    pdfGenerator.addKeyValueList(businessInfo);
    
    // Add digital presence section
    pdfGenerator.addSection('Kehadiran Digital');
    pdfGenerator.addKeyValueList(digitalPresence);
    
    // Add challenges section
    pdfGenerator.addSection('Tantangan Bisnis');
    pdfGenerator.addBulletList(challenges);
    
    // Page 2: AI Analysis - moved to new page in addMultilineText
    pdfGenerator.addMultilineText(aiAnalysis);
    
    // Add recommendations section if available
    if (recommendations && recommendations.length > 0) {
      pdfGenerator.addRecommendations(recommendations);
    }
    
    // Add footer to all pages
    pdfGenerator.addFooter();
    
    // Save the PDF
    const filename = generateReportFilename(businessData.businessName);
    console.log("Saving PDF with filename:", filename);
    pdfGenerator.savePdf(filename);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
