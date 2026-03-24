
import { PdfGenerator } from '../pdfGenerator';

/**
 * Add logo and header to the document with improved styling
 * Professional design with proper spacing for executive reports
 */
export function addHeader(pdf: PdfGenerator, title: string, subtitle: string): void {
  pdf.currentY = 25; // Increased top margin (2.5cm) for better print appearance
  
  // Add betterworks logo
  const logoWidth = 20;
  const logoHeight = 20;
  
  // Add betterworks logo using addImage
  pdf.doc.addImage(
    '/lovable-uploads/b0f2f127-66ca-431f-ace4-3aad2575d667.png', 
    'PNG', 
    pdf.margin, 
    pdf.currentY, 
    logoWidth, 
    logoHeight
  );
  
  // Add title with proper styling and brand colors
  pdf.doc.setFontSize(16); // Slightly smaller for more professional look
  pdf.doc.setFont('Roboto', 'bold');
  pdf.doc.setTextColor(pdf.colors.dark);
  pdf.doc.text('betterworks.id', pdf.margin + 25, pdf.currentY + 8);
  
  // Add subtitle
  pdf.doc.setFontSize(12);
  pdf.doc.setFont('Roboto', 'normal');
  pdf.doc.setTextColor(pdf.colors.secondary);
  pdf.doc.text(subtitle, pdf.margin + 25, pdf.currentY + 15);
  
  // Add date with proper styling
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  pdf.doc.setFontSize(8); // Smaller size for date
  pdf.doc.setTextColor(pdf.colors.gray);
  pdf.doc.text(`Tanggal: ${formattedDate}`, pdf.pageWidth - pdf.margin - 40, pdf.currentY + 8);
  
  // Add horizontal line with brand color
  const lineY = pdf.currentY + 25;
  pdf.doc.setDrawColor(pdf.colors.accent); // Use brand yellow for line
  pdf.doc.setLineWidth(0.5);
  pdf.doc.line(pdf.margin, lineY, pdf.pageWidth - pdf.margin, lineY);
  
  pdf.currentY = lineY + 15; // Increased spacing after header
}
