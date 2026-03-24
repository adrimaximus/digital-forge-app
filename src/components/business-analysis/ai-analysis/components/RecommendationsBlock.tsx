
import React from 'react';
import { Zap } from 'lucide-react';

interface RecommendationsBlockProps {
  recommendationsText: string | null;
}

const RecommendationsBlock: React.FC<RecommendationsBlockProps> = ({ recommendationsText }) => {
  if (!recommendationsText) return null;
  
  return (
    <div className="mt-6 animate-in fade-in duration-700 bg-yellow-400/5 border-l-2 border-yellow-400/40 pl-3 py-3 rounded-r">
      <div className="flex gap-3 items-start">
        <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0" />
        <div>
          <p className="font-medium text-yellow-300 mb-1">Kesimpulan Singkat</p>
          <p className="whitespace-pre-line break-words text-slate-200 leading-relaxed">
            {recommendationsText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsBlock;
