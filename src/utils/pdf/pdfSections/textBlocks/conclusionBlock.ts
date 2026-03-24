
import { PdfGenerator } from '../../pdfGenerator';
import { checkAndAddPage } from '../../pdfUtils/pageUtils';

/**
 * Process conclusion block with simple styling
 * Updated to use left alignment for better readability
 */
export function processConclusionBlock(pdf: PdfGenerator, conclusionBlock: string): void {
  if (!conclusionBlock) return;
  
  // Always start conclusion on a new page
  pdf.doc.addPage();
  pdf.currentY = 25; // Reset Y position to top of page with margin
  
  // Set font for content
  pdf.doc.setFont('Roboto', 'normal');
  pdf.doc.setFontSize(11);
  pdf.doc.setTextColor(pdf.colors.dark);
  
  // Set left alignment for better readability
  pdf.setTextAlign('left');
  
  // Process text content with consistent spacing
  const contentLines = pdf.doc.splitTextToSize(conclusionBlock, pdf.contentWidth);
  pdf.doc.text(contentLines, pdf.margin, pdf.currentY);
  
  // Minimal line spacing to match example
  const lineHeight = 4.8;
  pdf.currentY += contentLines.length * lineHeight + 10;
}
