
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add bullet-point list with professional styling
 * Consistent spacing and clean layout
 */
export function addBulletList(pdf: PdfGenerator, items: string[]): void {
  const rowHeight = 6; // Consistent row height
  
  items.forEach((item, index) => {
    // Check if we need a new page
    if (pdf.currentY > 265) {
      pdf.doc.addPage();
      pdf.currentY = 25; // Match top margin from header
    }
    
    // Add alternating row background
    if (index % 2 === 1) {
      pdf.doc.setFillColor(254, 247, 205); // Very light yellow
      pdf.doc.rect(pdf.margin - 2, pdf.currentY - 1, pdf.contentWidth + 4, rowHeight, 'F');
    }
    
    // Add bullet circle
    pdf.doc.setDrawColor(pdf.colors.accent);
    pdf.doc.setFillColor(pdf.colors.accent); // Brand yellow
    pdf.doc.circle(pdf.margin + 2, pdf.currentY + 2.5, 1.2, 'F');
    
    // Ensure text wrapping for long items
    pdf.doc.setFont('Roboto', 'normal');
    const lines = pdf.doc.splitTextToSize(item, pdf.contentWidth - 10);
    
    // Add text with proper spacing
    pdf.doc.text(lines, pdf.margin + 5, pdf.currentY + 3);
    
    // Calculate height needed for this row (based on number of lines)
    const calculatedHeight = Math.max(rowHeight, lines.length * 5);
    
    // Adjust position for next item
    pdf.currentY += calculatedHeight;
  });
  
  pdf.currentY += 6; // Add spacing after the list section
}
