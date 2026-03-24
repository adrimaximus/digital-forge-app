
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SeoScoreBarProps {
  seoScore: number;
  animationDelay?: string;
}

const SeoScoreBar: React.FC<SeoScoreBarProps> = ({ seoScore, animationDelay = '0.3s' }) => {
  return (
    <div className="space-y-3">
      <div className="h-2 bg-slate-700 rounded-full w-full">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-slide-in-right" 
          style={{ width: `${seoScore}%`, transitionDuration: '1s' }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-slate-400 animate-fade-in" style={{ animationDelay }}>
        <span>SEO Score</span>
        <span className="font-bold text-yellow-400">{seoScore}/100</span>
      </div>
    </div>
  );
};

export default SeoScoreBar;
