
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add key-value pairs as list items with improved styling
 * Professional grid layout with consistent spacing
 */
export function addKeyValueList(pdf: PdfGenerator, items: Array<{ label: string; value: string | boolean | undefined }>): void {
  const rowHeight = 6; // Consistent row height
  const alternateRowColor = '#F9F9F9'; // Very subtle alternating row color
  
  items.forEach((item, index) => {
    // Check if we need a new page
    if (pdf.currentY > 265) {
      pdf.doc.addPage();
      pdf.currentY = 25; // Match top margin from header
    }
    
    // Add alternating row background for better readability
    if (index % 2 === 1) {
      pdf.doc.setFillColor(249, 249, 249); // Convert hex to RGB
      pdf.doc.rect(pdf.margin - 2, pdf.currentY - 1, pdf.contentWidth + 4, rowHeight, 'F');
    }
    
    // Format label and value
    const label = `${item.label}:`;
    const value = item.value !== undefined ? String(item.value) : 'N/A';
    
    // Add label with proper styling
    pdf.doc.setFont('Roboto', 'bold');
    pdf.doc.setTextColor(pdf.colors.secondary);
    pdf.doc.text(label, pdf.margin, pdf.currentY + 3);
    
    // Add value with proper styling
    pdf.doc.setFont('Roboto', 'normal');
    pdf.doc.setTextColor(pdf.colors.dark);
    
    // Ensure text wrapping for long values
    const valueLines = pdf.doc.splitTextToSize(value, (pdf.contentWidth * 2) / 3);
    pdf.doc.text(valueLines, pdf.margin + pdf.contentWidth / 3, pdf.currentY + 3);
    
    // Calculate height needed for this row (based on number of value lines)
    const calculatedHeight = Math.max(rowHeight, valueLines.length * 5);
    
    // Adjust position for next row
    pdf.currentY += calculatedHeight;
  });
  
  pdf.currentY += 6; // Add spacing after the list section
}
