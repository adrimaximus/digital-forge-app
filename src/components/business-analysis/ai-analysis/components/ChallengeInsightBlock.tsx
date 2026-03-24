
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ChallengeInsightBlockProps {
  insightText: string | null;
}

const ChallengeInsightBlock: React.FC<ChallengeInsightBlockProps> = ({ insightText }) => {
  if (!insightText || insightText.trim() === '') return null;
  
  console.log("Rendering ChallengeInsightBlock with insight:", insightText?.substring(0, 50));
  
  return (
    <div className="my-5 animate-in fade-in duration-700 bg-yellow-400/5 border-l-2 border-yellow-400/40 pl-3 py-2 rounded-r">
      <div className="flex gap-3 items-start mb-1">
        <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-300 mb-1">Insight Tantangan Bisnis</p>
          <p className="whitespace-pre-line break-words text-slate-200 leading-relaxed">
            {insightText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeInsightBlock;
