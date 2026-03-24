import React from 'react';
import { FormData } from '../AnalysisForm';
import { ChevronRight } from 'lucide-react';

interface CompetitorComparisonProps {
  formData: FormData;
  analysisResults?: string | null;
  competitorData?: {
    competitorData: { name: string, value: number }[];
    competitors: Array<{ name: string, location: string, strengthText: string }>;
    citations: string[];
  } | null;
}

const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({ 
  formData, 
  analysisResults, 
  competitorData 
}) => {
  // Get competitors based on API data
  const getCompetitors = () => {
    // If we have API competitor data, use it
    if (competitorData?.competitors && competitorData.competitors.length > 0) {
      return competitorData.competitors;
    }
    
    // Otherwise extract from analysis or provide defaults
    return extractCompetitorsFromAnalysis(analysisResults) || getDefaultCompetitors(formData.industry);
  };
  
  // Extract competitor information from AI analysis if available
  const extractCompetitorsFromAnalysis = (analysis: string | null | undefined): Array<{ name: string, location: string, strengthText: string }> | null => {
    if (!analysis) return null;
    
    const lowerCaseAnalysis = analysis.toLowerCase();
    const sentences = analysis.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Look for sentences mentioning competitors or brands
    const competitorSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes("kompetitor") || 
      sentence.toLowerCase().includes("pesaing") ||
      sentence.toLowerCase().includes("brand") ||
      sentence.toLowerCase().includes("merek")
    );
    
    if (competitorSentences.length > 0) {
      // Try to extract competitor names
      const extractedNames: string[] = [];
      const regex = /(?:"([^"]+)"|'([^']+)'|([A-Z][a-zA-Z\s]+)(?=\s(adalah|merupakan|sebagai|menjadi)))/g;
      
      competitorSentences.forEach(sentence => {
        let match;
        while ((match = regex.exec(sentence)) !== null) {
          const name = match[1] || match[2] || match[3];
          if (name && name.length > 2 && !extractedNames.includes(name)) {
            extractedNames.push(name);
          }
        }
      });
      
      if (extractedNames.length > 0) {
        return extractedNames.slice(0, 3).map(name => ({
          name,
          location: detectLocationFromName(name) || 'Indonesia',
          strengthText: extractStrengthForCompetitor(analysis, name) || 'produk berkualitas'
        }));
      }
    }
    
    return null;
  };
  
  // Detect location based on common Indonesian cities in the name
  const detectLocationFromName = (name: string): string | null => {
    const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan', 'Makassar', 'Bali', 'Semarang'];
    for (const city of cities) {
      if (name.includes(city)) return city;
    }
    return null;
  };
  
  // Extract strength for a specific competitor from the analysis
  const extractStrengthForCompetitor = (analysis: string, competitorName: string): string | null => {
    const sentences = analysis.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const relevantSentences = sentences.filter(s => s.includes(competitorName));
    
    if (relevantSentences.length > 0) {
      const patterns = [
        new RegExp(`${competitorName}\\s+(?:terkenal|dikenal|unggul)\\s+(?:dalam|dengan)\\s+([^,.]+)`, 'i'),
        new RegExp(`${competitorName}\\s+(?:memiliki|punya|dengan)\\s+([^,.]+)`, 'i'),
        new RegExp(`${competitorName}\\s+([^,.]+?)\\s+(?:yang|dan)\\s+(?:baik|bagus|unggul)`, 'i')
      ];
      
      for (const pattern of patterns) {
        for (const sentence of relevantSentences) {
          const match = pattern.exec(sentence);
          if (match && match[1]) {
            return match[1].trim();
          }
        }
      }
    }
    
    // Default strengths based on industry
    if (formData.industry.toLowerCase().includes('fashion')) return 'desain lokal';
    if (formData.industry.toLowerCase().includes('makanan')) return 'cita rasa unik';
    if (formData.industry.toLowerCase().includes('digital')) return 'strategi digital';
    if (formData.industry.toLowerCase().includes('teknologi')) return 'inovasi';
    
    return null;
  };

  // Default competitors by industry for fallback 
  const getDefaultCompetitors = (industry: string): Array<{ name: string, location: string, strengthText: string }> => {
    // Map of industry keywords to relevant competitors
    const competitorsByIndustry: Record<string, Array<{ name: string, location: string, strengthText: string }>> = {
      'digital_agency': [
        { name: 'Hakuhodo', location: 'Jakarta', strengthText: 'kampanye kreatif' },
        { name: 'Mirum Agency', location: 'Jakarta', strengthText: 'solusi teknologi' },
        { name: 'Para Digma', location: 'Jakarta', strengthText: 'strategi digital' },
      ],
      'fashion': [
        { name: 'This Is April', location: 'Jakarta', strengthText: 'desain lokal' },
        { name: 'Cotton Ink', location: 'Jakarta', strengthText: 'kualitas material' },
        { name: 'Berrybenka', location: 'Jakarta', strengthText: 'variasi produk' },
      ],
      'food': [
        { name: 'Maicih', location: 'Bandung', strengthText: 'cita rasa pedas' },
        { name: 'Malang Strudel', location: 'Malang', strengthText: 'inovasi rasa' },
        { name: 'Batagor Kingsley', location: 'Bandung', strengthText: 'konsistensi kualitas' },
      ],
      'beauty': [
        { name: 'Wardah', location: 'Jakarta', strengthText: 'halal certified' },
        { name: 'Somethinc', location: 'Jakarta', strengthText: 'formula inovatif' },
        { name: 'Avoskin', location: 'Surabaya', strengthText: 'ingredients fokus' },
      ],
    };
    
    // Determine which industry based on the input
    const lowercaseIndustry = industry.toLowerCase();
    let selectedIndustry = 'digital_agency'; // Default industry
    
    if (lowercaseIndustry.includes('digital') || lowercaseIndustry.includes('agensi') || lowercaseIndustry.includes('agency') || lowercaseIndustry.includes('marketing')) {
      selectedIndustry = 'digital_agency';
    } else if (lowercaseIndustry.includes('baju') || lowercaseIndustry.includes('pakaian') || lowercaseIndustry.includes('fashion')) {
      selectedIndustry = 'fashion';
    } else if (lowercaseIndustry.includes('makanan') || lowercaseIndustry.includes('kuliner') || lowercaseIndustry.includes('food')) {
      selectedIndustry = 'food';
    } else if (lowercaseIndustry.includes('kecantikan') || lowercaseIndustry.includes('skincare') || lowercaseIndustry.includes('makeup')) {
      selectedIndustry = 'beauty';
    }
    
    return competitorsByIndustry[selectedIndustry] || competitorsByIndustry['digital_agency'];
  };

  const competitors = getCompetitors();

  return (
    <div className="mt-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-sm font-medium">Kompetitor Relevan</h4>
      </div>
      <div className="space-y-3">
        {competitors.map((competitor, index) => (
          <div 
            key={competitor.name + index}
            className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 hover:bg-slate-700/80 transition-colors"
            style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{competitor.name}</span>
                <span className="text-xs text-slate-400">{competitor.location}</span>
              </div>
              <div className="flex items-center text-sm text-yellow-400">
                <span>Unggul dalam {competitor.strengthText}</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorComparison;
