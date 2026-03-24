
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add a section with styled title
 * Updated for simple design matching the example image exactly
 */
export function addSection(pdf: PdfGenerator, title: string): void {
  // Check if we need a new page
  if (pdf.currentY > 265) {
    pdf.doc.addPage();
    pdf.currentY = 25; // Match top margin from header
  }
  
  // Set font for title - bold and larger size
  pdf.doc.setFont('Roboto', 'bold');
  pdf.doc.setFontSize(14); // Slightly smaller per the image
  pdf.doc.setTextColor(pdf.colors.dark);
  
  // Draw the title as plain text with no decorations
  pdf.doc.text(title, pdf.margin, pdf.currentY);
  
  // Adjust position with minimal spacing after title as shown in the image
  pdf.currentY += 10; // Reduced spacing after title to match image
  
  // Reset text settings after drawing title
  pdf.doc.setFont('Roboto', 'normal');
  pdf.doc.setFontSize(11);
  pdf.doc.setTextColor(pdf.colors.dark);
}
