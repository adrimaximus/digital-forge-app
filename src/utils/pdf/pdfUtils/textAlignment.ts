import { jsPDF } from 'jspdf';
import { PdfGenerator } from '../pdfGenerator';

/**
 * Extends jsPDF with text alignment functionality
 * Improved to handle paragraphs properly and use left alignment by default
 */
export function extendJsPDFWithAlignment(pdf: PdfGenerator): void {
  // Store reference to "this" for use in method overrides
  const pdfGen = pdf;
  
  // Store the original text function
  const originalText = pdf.doc.text;
  
  // Override the text function to handle proper paragraph formation
  pdf.doc.text = function(text: string | string[], x: number, y: number, options?: any) {
    const align = pdfGen.textAlign;
    
    // Make sure Roboto font is applied
    this.setFont('Roboto');
    
    // For left alignment (default) or other alignments with options
    if (align !== 'justify' || (options && typeof options !== 'string')) {
      if (align === 'left' && !options) {
        return originalText.call(this, text, x, y);
      } else if (!options) {
        // For center or right alignment without options
        return originalText.call(this, text, x, y, { align });
      } else {
        return originalText.call(this, text, x, y, options);
      }
    }
    
    // For justified text, we need to implement our own version
    if (typeof text === 'string') {
      text = [text];
    }
    
    const fontSize = this.getFontSize();
    const margin = pdfGen.margin;
    
    // Use maxContentWidth for better readability
    const maxWidth = pdfGen.maxContentWidth;
    
    // Keep track of our y position to increment it
    let currentY = y;
    
    // Use proper line spacing based on PdfGenerator's lineHeight
    const lineSpacing = fontSize * (pdfGen.lineHeight - 1);
    
    text.forEach((line: string) => {
      // Skip empty lines
      if (!line.trim()) {
        currentY += fontSize + lineSpacing;
        return;
      }
      
      // For left alignment, simply use the built-in text function with wrapped text
      if (align !== 'justify') {
        const wrappedLines = this.splitTextToSize(line, maxWidth);
        originalText.call(this, wrappedLines, x, currentY);
        currentY += wrappedLines.length * (fontSize + lineSpacing);
        return;
      }
      
      // Only below code runs if we're using justify alignment
      
      // Split line into words
      const words = line.split(' ');
      let currentLine = words[0];
      
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + ' ' + word;
        const testWidth = this.getStringUnitWidth(testLine) * fontSize / this.internal.scaleFactor;
        
        if (testWidth > maxWidth) {
          // Print the current line before it gets too long
          // For justified text (except last line), add spacing between words
          const spacesCount = currentLine.split(' ').length - 1;
          
          if (spacesCount > 0) {
            // Calculate exact spacing for justified text
            const textWidth = this.getStringUnitWidth(currentLine.replace(/ /g, '')) * fontSize / this.internal.scaleFactor;
            const spaceWidth = (maxWidth - textWidth) / spacesCount;
            const parts = currentLine.split(' ');
            
            let xPos = x;
            parts.forEach((part, j) => {
              if (part) {
                originalText.call(this, part, xPos, currentY);
                if (j < parts.length - 1) {
                  xPos += this.getStringUnitWidth(part) * fontSize / this.internal.scaleFactor + spaceWidth;
                }
              }
            });
          } else {
            // Just one word on the line
            originalText.call(this, currentLine, x, currentY);
          }
          
          // Move to next line with proper line spacing
          currentY += fontSize + lineSpacing;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      
      // Print the last line (not justified as it's the end of paragraph)
      originalText.call(this, currentLine, x, currentY);
      currentY += fontSize + lineSpacing;
    });
    
    return this;
  };
}
