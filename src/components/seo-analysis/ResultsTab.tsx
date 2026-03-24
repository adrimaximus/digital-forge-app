
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormData } from './AnalysisForm';
import KeywordAnalysis from './components/KeywordAnalysis';
import TrendStatistics from './components/TrendStatistics';
import PlatformPerformance from './components/PlatformPerformance';
import MonthlyTrendChart from './components/MonthlyTrendChart';
import ActionButtons from './components/ActionButtons';
import Citations from './components/Citations';

interface ResultsTabProps {
  formData: FormData;
  analysisResults: string | null;
  trendData: {
    monthlyData: { name: string, value: number }[];
    citations: string[];
  } | null;
  competitorData: {
    competitorData: { name: string, value: number }[];
    competitors: Array<{ name: string, location: string, strengthText: string }>;
    citations: string[];
  } | null;
  platformData: {
    platformData: { name: string, value: number }[];
    citations: string[];
  } | null;
  citations: string[];
}

const ResultsTab: React.FC<ResultsTabProps> = ({ 
  formData, 
  analysisResults, 
  trendData, 
  competitorData, 
  platformData,
  citations
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Analisis</CardTitle>
        <CardDescription>
          Insight dan rekomendasi untuk meningkatkan performa online Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <KeywordAnalysis 
            formData={formData} 
            analysisResults={analysisResults} 
            competitorData={competitorData}
          />
          
          <TrendStatistics 
            analysisResults={analysisResults} 
            trendData={trendData}
          />
          
          <PlatformPerformance 
            analysisResults={analysisResults} 
            platformData={platformData}
          />
          
          <MonthlyTrendChart 
            analysisResults={analysisResults} 
            trendData={trendData}
          />
          
          <Citations citations={citations} />
          
          <ActionButtons analysisResults={analysisResults} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTab;
