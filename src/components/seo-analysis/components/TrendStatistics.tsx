
import React from 'react';
import { BarChart3, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

interface TrendStatisticsProps {
  analysisResults: string | null;
  trendData: {
    monthlyData: { name: string, value: number }[];
    citations: string[];
  } | null;
}

const TrendStatistics: React.FC<TrendStatisticsProps> = ({ analysisResults, trendData }) => {
  // Calculate statistics from the provided trend data
  const calculateStatistics = () => {
    if (!trendData?.monthlyData || trendData.monthlyData.length < 2) {
      return {
        growthRate: 5.2,
        volumePerMonth: 250,
        engagementRate: 3.8
      };
    }

    const monthlyData = trendData.monthlyData;
    const latestMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    
    // Calculate growth rate
    const growthRate = previousMonth.value !== 0 
      ? ((latestMonth.value - previousMonth.value) / previousMonth.value) * 100 
      : 0;
    
    // Calculate average monthly volume
    const totalVolume = monthlyData.reduce((sum, month) => sum + month.value, 0);
    const volumePerMonth = Math.round(totalVolume / monthlyData.length);
    
    // Calculate "engagement rate" (this is a made-up metric for display)
    // In a real app, this would be based on real engagement data
    const engagementRate = (Math.abs(growthRate) * 0.4) + 2;
    
    return {
      growthRate,
      volumePerMonth,
      engagementRate
    };
  };

  const { growthRate, volumePerMonth, engagementRate } = calculateStatistics();
  const isPositiveGrowth = growthRate > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Growth Rate */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Pertumbuhan Pencarian</span>
          <div className={`flex items-center ${isPositiveGrowth ? 'text-green-400' : 'text-red-400'}`}>
            {isPositiveGrowth ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{growthRate.toFixed(1)}%</span>
          <span className={`text-xs ${isPositiveGrowth ? 'text-green-400' : 'text-red-400'}`}>
            {isPositiveGrowth ? 'Meningkat' : 'Menurun'}
          </span>
        </div>
      </div>
      
      {/* Volume */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Volume Pencarian</span>
          <BarChart3 className="h-4 w-4 text-blue-400" />
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{volumePerMonth}</span>
          <span className="text-xs text-slate-400">per bulan</span>
        </div>
      </div>
      
      {/* Engagement Rate */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Engagement Rate</span>
          <TrendingUp className="h-4 w-4 text-purple-400" />
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{engagementRate.toFixed(1)}%</span>
          <span className="text-xs text-green-400">+0.8%</span>
        </div>
      </div>
    </div>
  );
};

export default TrendStatistics;
