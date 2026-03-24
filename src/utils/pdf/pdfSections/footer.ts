
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add footer to all pages with professional styling
 * Fixed overlapping text issue by improving spacing and layout
 * Added "beta report" text as requested
 */
export function addFooter(pdf: PdfGenerator): void {
  // Position footer lower on the page (was 275, now 270)
  const footerHeight = 270; 
  
  for (let i = 1; i <= pdf.doc.getNumberOfPages(); i++) {
    pdf.doc.setPage(i);
    
    // Add separator line above footer content
    pdf.doc.setDrawColor(pdf.colors.accent);
    pdf.doc.setLineWidth(0.3);
    pdf.doc.line(pdf.margin, footerHeight - 10, pdf.pageWidth - pdf.margin, footerHeight - 10);
    
    // Add "beta report" text - positioned in top right of footer
    pdf.doc.setFontSize(8);
    pdf.doc.setTextColor(pdf.colors.gray);
    pdf.doc.setFont('Roboto', 'italic');
    pdf.doc.text('beta report', pdf.pageWidth - pdf.margin, footerHeight - 5, { align: 'right' });
    
    // Reset font to normal for rest of footer
    pdf.doc.setFont('Roboto', 'normal');
    
    // Add page number - positioned properly
    pdf.doc.setFontSize(8);
    pdf.doc.setTextColor(pdf.colors.gray);
    pdf.doc.text(`Halaman ${i} dari ${pdf.doc.getNumberOfPages()}`, pdf.pageWidth - pdf.margin, footerHeight, { align: 'right' });
    
    // Add contact information on first line with better vertical spacing
    pdf.doc.text('betterworks.id | hello@betterworks.id | +62821-1403-9731', pdf.margin, footerHeight);
    
    // Add location on next line with increased spacing to prevent overlap
    pdf.doc.text('https://maps.app.goo.gl/HbEwgNo67GSHhkEM7', pdf.margin, footerHeight + 8);
  }
}
