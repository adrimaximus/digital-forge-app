
import { PdfGenerator } from '../../pdfGenerator';
import { checkAndAddPage } from '../../pdfUtils/pageUtils';

/**
 * Process insight block with professional styling
 */
export function processInsightBlock(pdf: PdfGenerator, insightBlock: string): void {
  if (!insightBlock) return;
  
  // Check if we need a new page
  checkAndAddPage(pdf);
  
  // Add section title with auto-fit height background
  const titleText = "Insight Tantangan Bisnis";
  const titleHeight = 8; // Base height for text
  const paddingY = 4; // Vertical padding
  const backgroundHeight = titleHeight + (paddingY * 2);
  
  pdf.doc.setFillColor(245, 245, 245); // Light gray background
  pdf.doc.rect(pdf.margin - 2, pdf.currentY - 2, pdf.contentWidth + 4, backgroundHeight, 'F');
  
  // Add accent bar on left
  pdf.doc.setFillColor(pdf.colors.primary);
  pdf.doc.rect(pdf.margin - 2, pdf.currentY - 2, 3, backgroundHeight, 'F');
  
  // Add title text
  pdf.doc.setFont('Roboto', 'bold');
  pdf.doc.setTextColor(pdf.colors.primary);
  pdf.doc.text(titleText, pdf.margin + 4, pdf.currentY + (titleHeight / 2) + 1);
  
  // Add spacing after title
  pdf.currentY += backgroundHeight + 6;
  
  // Extract and add content
  let insightContent = insightBlock;
  if (insightBlock.toLowerCase().includes('insight tantangan:')) {
    insightContent = insightBlock.split(':').slice(1).join(':').trim();
  }
  
  // Add content with professional formatting
  pdf.doc.setFont('Roboto', 'normal');
  pdf.doc.setTextColor(pdf.colors.dark);
  pdf.setTextAlign('justify');
  
  const contentLines = pdf.doc.splitTextToSize(insightContent, pdf.contentWidth);
  pdf.doc.text(contentLines, pdf.margin, pdf.currentY);
  
  // Add paragraph spacing (2em)
  const lineHeight = 5; // Approx. line height
  pdf.currentY += contentLines.length * lineHeight + 16; // 2em spacing
  
  // Reset text alignment
  pdf.setTextAlign('left');
}
