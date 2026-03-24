
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface PlatformPerformanceProps {
  analysisResults: string | null;
  platformData: {
    platformData: { name: string, value: number }[];
    citations: string[];
  } | null;
}

const PlatformPerformance: React.FC<PlatformPerformanceProps> = ({ analysisResults, platformData }) => {
  // Extract platform-related insights from AI analysis
  const renderPlatformInsights = () => {
    if (!analysisResults) return null;
    
    const extractPlatformInsights = (text: string): string => {
      const sentences = text.split('. ').filter(s => s.trim().length > 0);
      
      // Look for sentences about social media and platforms
      const platformSentences = sentences.filter(sentence => 
        sentence.toLowerCase().includes("media sosial") || 
        sentence.toLowerCase().includes("platform") ||
        sentence.toLowerCase().includes("instagram") ||
        sentence.toLowerCase().includes("facebook") ||
        sentence.toLowerCase().includes("tiktok") ||
        sentence.toLowerCase().includes("twitter") ||
        sentence.toLowerCase().includes("youtube")
      );
      
      // Take the first 2 platform-related sentences or fall back to general sentences
      if (platformSentences.length > 0) {
        return platformSentences.slice(0, 2).join('. ') + '.';
      }
      
      return '';
    };
    
    const platformInsight = extractPlatformInsights(analysisResults);
    
    if (!platformInsight) return null;
    
    return (
      <div className="mt-4">
        <p className="text-sm text-slate-200">{platformInsight}</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-800 border border-yellow-400/20 rounded-lg p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Platform Performance</h3>
      </div>
      
      <div className="h-64 w-full">
        <ChartContainer config={{ bar1: { color: '#8B5CF6' } }} className="h-64 animate-scale-in">
          <BarChart data={platformData?.platformData || []}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--color-bar1, #8B5CF6)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
      
      {renderPlatformInsights()}
    </div>
  );
};

export default PlatformPerformance;
