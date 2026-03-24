
import React, { ReactNode } from 'react';

interface ParagraphWithIconProps {
  icon: ReactNode;
  text: string;
  isFirst?: boolean;
  animationDelay?: number;
}

const ParagraphWithIcon: React.FC<ParagraphWithIconProps> = ({
  icon, 
  text, 
  isFirst = false,
  animationDelay = 0
}) => {
  if (isFirst) {
    return (
      <div className="mb-6 pl-2 border-l-2 border-yellow-400/50 animate-in fade-in duration-700">
        <p className="whitespace-pre-line break-words text-slate-100 leading-relaxed text-base">
          {text}
        </p>
      </div>
    );
  }
  
  return (
    <div 
      className="mb-4 animate-in fade-in duration-700" 
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex gap-3 items-start mb-1.5">
        {icon}
        <p className="whitespace-pre-line break-words text-slate-200 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ParagraphWithIcon;
