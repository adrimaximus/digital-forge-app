
import { PdfGenerator } from '../pdfGenerator';

/**
 * Check if we need to add a new page
 * Using standard print margins with improved footer clearance
 */
export function checkAndAddPage(pdf: PdfGenerator): void {
  // Adjusted the threshold to account for footer height (reduced from 265 to 250)
  // This ensures content stops well before the footer begins
  if (pdf.currentY > 250) { 
    pdf.doc.addPage();
    pdf.currentY = 25; // Match top margin from header (2.5cm)
  }
}
