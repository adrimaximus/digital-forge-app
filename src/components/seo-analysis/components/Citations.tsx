
import React from 'react';
import { BookOpen } from 'lucide-react';

interface CitationsProps {
  citations: string[];
}

const Citations: React.FC<CitationsProps> = ({ citations }) => {
  // Filter and deduplicate citations
  const uniqueCitations = Array.from(new Set(citations))
    .filter(Boolean)
    .filter(citation => !citation.includes("[CITATION") && !citation.includes("[Citation")); // Filter out placeholder citations
  
  if (uniqueCitations.length === 0) return null;

  // Process citations to extract URLs if present
  const processedCitations = uniqueCitations.map(citation => {
    // Look for URLs in the citation
    const urlMatch = citation.match(/(https?:\/\/[^\s]+)/);
    return {
      text: citation.replace(/(https?:\/\/[^\s]+)/, '').trim(),
      url: urlMatch ? urlMatch[0] : null
    };
  });

  return (
    <div className="bg-slate-800 border border-yellow-400/20 rounded-lg p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Sumber & Referensi</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        {processedCitations.map((citation, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-slate-400">{index + 1}.</span>
            <div className="text-slate-300">
              {citation.text}
              {citation.url && (
                <a 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-1 text-yellow-400 hover:underline"
                >
                  {citation.url}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Citations;
