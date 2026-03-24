
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add recommendations section with styled yellow background and circular bullets
 * Matches the example image exactly with consistent styling
 */
export function addRecommendations(pdf: PdfGenerator, recommendations: string[]): void {
  if (!recommendations || recommendations.length === 0) return;
  
  // Check if we need a new page (this will be handled by the calling function now)
  
  // Add header with yellow background
  const titleText = "Rekomendasi Layanan";
  const titleHeight = 10;
  const paddingY = 5;
  const backgroundHeight = titleHeight + (paddingY * 2);
  
  // Yellow background for header
  pdf.doc.setFillColor(254, 247, 205); // Light yellow background
  pdf.doc.rect(pdf.margin - 2, pdf.currentY - paddingY, pdf.contentWidth + 4, backgroundHeight, 'F');
  
  // Add title text
  pdf.doc.setFont('Roboto', 'bold');
  pdf.doc.setFontSize(14);
  pdf.doc.setTextColor(pdf.colors.primary); // Yellow color for title
  pdf.doc.text(titleText, pdf.margin, pdf.currentY + 5);
  
  // Adjust position with spacing after title
  pdf.currentY += backgroundHeight + 5;
  
  // Reset text settings 
  pdf.doc.setFont('Roboto', 'normal');
  pdf.doc.setFontSize(11);
  pdf.doc.setTextColor(pdf.colors.dark);
  
  // Add each recommendation with yellow background and circle
  recommendations.forEach((rec, index) => {
    // Check if we need a new page
    if (pdf.currentY > 265) {
      pdf.doc.addPage();
      pdf.currentY = 20;
    }
    
    const itemHeight = 10;
    const itemPaddingY = 5;
    const itemBackgroundHeight = itemHeight + (itemPaddingY * 2);
    
    // Add yellow background for each item
    pdf.doc.setFillColor(254, 247, 205); // Light yellow background
    pdf.doc.rect(pdf.margin - 2, pdf.currentY - itemPaddingY, pdf.contentWidth + 4, itemBackgroundHeight, 'F');
    
    // Add yellow circle bullet
    pdf.doc.setDrawColor(pdf.colors.primary);
    pdf.doc.setFillColor(pdf.colors.primary); // Brand yellow
    pdf.doc.circle(pdf.margin + 8, pdf.currentY + 2, 3.5, 'F');
    
    // Add recommendation text
    pdf.doc.setFont('Roboto', 'normal');
    pdf.doc.setFontSize(11);
    pdf.doc.setTextColor(pdf.colors.dark);
    pdf.doc.text(rec, pdf.margin + 18, pdf.currentY + 4);
    
    // Spacing between recommendations
    pdf.currentY += itemBackgroundHeight + 5;
  });
  
  // Add final spacing after recommendations section
  pdf.currentY += 5;
}
