
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MonthlyTrendChartProps {
  analysisResults: string | null;
  trendData: {
    monthlyData: { name: string, value: number }[];
    citations: string[];
  } | null;
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ analysisResults, trendData }) => {
  // Parse the AI results into sections and extract insights
  const renderAIAnalysis = () => {
    if (!analysisResults) return null;
    
    // Extract trend-related insights from AI analysis
    const extractTrendInsights = (text: string): string => {
      const sentences = text.split('. ').filter(s => s.trim().length > 0);
      
      // Look for sentences about trends and popularity
      const trendSentences = sentences.filter(sentence => 
        sentence.toLowerCase().includes("tren") || 
        sentence.toLowerCase().includes("trend") ||
        sentence.toLowerCase().includes("popularitas") ||
        sentence.toLowerCase().includes("pertumbuhan") ||
        sentence.toLowerCase().includes("pencarian") ||
        sentence.toLowerCase().includes("meningkat") ||
        sentence.toLowerCase().includes("menurun")
      );
      
      // Take the first 3 trend-related sentences or fall back to first 2-3 general sentences
      if (trendSentences.length > 0) {
        return trendSentences.slice(0, 3).join('. ') + '.';
      }
      
      return sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '');
    };
    
    const trendInsight = extractTrendInsights(analysisResults);
    
    return (
      <div className="space-y-4 mt-4">
        <p className="text-sm text-slate-200">{trendInsight}</p>
      </div>
    );
  };

  // Handle case when trend data is not available
  const monthlyData = trendData?.monthlyData || [];

  return (
    <div className="bg-slate-800 border border-yellow-400/20 rounded-lg p-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Trend 6 Bulan Terakhir</h3>
      </div>
      
      <div className="h-64 w-full">
        <ChartContainer config={{ line1: { color: '#F97316' } }} className="h-64 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-line1, #F97316)" 
              strokeWidth={2}
              dot={{ fill: '#F97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
      
      {renderAIAnalysis()}
    </div>
  );
};

export default MonthlyTrendChart;
