import React from 'react';
import { Search } from 'lucide-react';
import { FormData } from '../AnalysisForm';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import SeoScoreBar from './SeoScoreBar';
import CompetitorComparison from './CompetitorComparison';

interface KeywordAnalysisProps {
  formData: FormData;
  analysisResults: string | null;
  competitorData: {
    competitorData: { name: string, value: number }[];
    competitors: Array<{ name: string, location: string, strengthText: string }>;
    citations: string[];
  } | null;
}

const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ formData, analysisResults, competitorData }) => {
  // Extract keyword potential from AI analysis
  const getKeywordPotential = () => {
    if (!analysisResults) return "High potential";
    
    const lowerCaseAnalysis = analysisResults.toLowerCase();
    if (lowerCaseAnalysis.includes("potensi rendah") || lowerCaseAnalysis.includes("potensi yang rendah")) {
      return "Potensi rendah";
    } else if (lowerCaseAnalysis.includes("potensi sedang") || lowerCaseAnalysis.includes("potensi yang sedang")) {
      return "Potensi sedang";
    } else {
      return "Potensi tinggi";
    }
  };
  
  // Calculate SEO score based on AI analysis
  const calculateSeoScore = () => {
    if (!analysisResults) return 75;
    
    const lowerCaseAnalysis = analysisResults.toLowerCase();
    
    // Check for positive indicators
    const positiveFactors = [
      "potensi tinggi", "tren naik", "popularitas meningkat", 
      "peluang besar", "volume pencarian tinggi", "persaingan rendah"
    ];
    
    // Check for negative indicators
    const negativeFactors = [
      "potensi rendah", "tren menurun", "popularitas menurun", 
      "persaingan tinggi", "volume pencarian rendah", "kompetisi tinggi"
    ];
    
    let score = 65; // Default score
    
    // Adjust score based on indicators
    positiveFactors.forEach(factor => {
      if (lowerCaseAnalysis.includes(factor)) score += 5;
    });
    
    negativeFactors.forEach(factor => {
      if (lowerCaseAnalysis.includes(factor)) score -= 5;
    });
    
    // Keep score within reasonable bounds
    return Math.max(30, Math.min(95, score));
  };
  
  const keywordPotential = getKeywordPotential();
  const seoScore = calculateSeoScore();
  const potentialColor = 
    keywordPotential === "Potensi rendah" ? "text-red-400" : 
    keywordPotential === "Potensi sedang" ? "text-yellow-400" : 
    "text-green-400";

  return (
    <div className="bg-slate-800 border border-yellow-400/20 rounded-lg p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <Search className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Keyword Analysis</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span>"{formData.keyword}"</span>
            <span className={potentialColor}>{keywordPotential}</span>
          </div>
          
          <SeoScoreBar seoScore={seoScore} />
        </div>
        
        <div className="flex flex-col space-y-2 border border-slate-700 rounded-lg p-4">
          <div className="text-center mb-1">Perbandingan Pencarian di Media Sosial</div>
          <div className="w-full h-24">
            <ChartContainer config={{ bar1: { color: '#F97316' } }} className="h-24 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <BarChart data={competitorData?.competitorData || []}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: '10px' }} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--color-bar1, #F97316)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="text-xs text-slate-400 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {analysisResults ? 
              extractCompetitionInsight(analysisResults) : 
              `Kompetisi: ${seoScore > 70 ? 'Rendah' : seoScore > 50 ? 'Sedang' : 'Tinggi'}`
            }
          </div>
        </div>
      </div>
      
      <CompetitorComparison 
        formData={formData} 
        analysisResults={analysisResults} 
        competitorData={competitorData}
      />
    </div>
  );
};

// Helper function to extract competition insight from AI analysis
const extractCompetitionInsight = (analysis: string): string => {
  const lowerCaseAnalysis = analysis.toLowerCase();
  const sentences = analysis.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Look for sentences mentioning competition
  const competitionSentences = sentences.filter(sentence => 
    sentence.toLowerCase().includes("kompetisi") || 
    sentence.toLowerCase().includes("persaingan") ||
    sentence.toLowerCase().includes("kompetitor")
  );
  
  if (competitionSentences.length > 0) {
    // Return a concise version of the first competition-related sentence
    const sentence = competitionSentences[0].trim();
    return sentence.length > 70 ? sentence.substring(0, 70) + '...' : sentence;
  }
  
  // Fallback text based on keyword competition assessment
  if (lowerCaseAnalysis.includes("persaingan tinggi") || lowerCaseAnalysis.includes("kompetisi tinggi")) {
    return "Kompetisi: Tinggi";
  } else if (lowerCaseAnalysis.includes("persaingan sedang") || lowerCaseAnalysis.includes("kompetisi sedang")) {
    return "Kompetisi: Sedang";
  } else {
    return "Kompetisi: Moderat";
  }
};

export default KeywordAnalysis;
