
import { PdfGenerator } from '../../pdfGenerator';
import { checkAndAddPage } from '../../pdfUtils/pageUtils';

/**
 * Process standard paragraphs with consistent spacing and left-aligned text for better readability
 * Updated to match the exact format from the provided image with no extra spacing between lines
 */
export function processStandardParagraphs(
  pdf: PdfGenerator, 
  paragraphs: string[]
): void {
  // Process standard paragraphs with compact spacing
  paragraphs.forEach((paragraph, pIndex) => {
    // Skip if empty
    if (!paragraph.trim()) return;
    
    // Check if we need to add page
    checkAndAddPage(pdf);
    
    // Set left text alignment for better readability
    pdf.setTextAlign('left');
    
    // Use standard formatting for all paragraphs
    pdf.doc.setFont('Roboto', 'normal');
    pdf.doc.setFontSize(11);
    
    const lines = pdf.doc.splitTextToSize(paragraph, pdf.contentWidth);
    pdf.doc.text(lines, pdf.margin, pdf.currentY);
    
    // Adjust line spacing to exactly match the provided image
    // Almost no space between lines within a paragraph
    const lineHeight = 4.5; // Tighter line spacing as shown in the image
    pdf.currentY += lines.length * lineHeight + 7; // Small space between paragraphs
  });
}
