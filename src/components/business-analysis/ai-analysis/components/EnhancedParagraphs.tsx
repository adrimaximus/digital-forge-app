import React from 'react';
import { 
  LineChart, LightbulbIcon, Star, 
  ChartBar, TrendingUp 
} from 'lucide-react';
import ParagraphWithIcon from './ParagraphWithIcon';
import ChallengeInsightBlock from './ChallengeInsightBlock';
import RecommendationsBlock from './RecommendationsBlock';

interface EnhancedParagraphsProps {
  paragraphs: string[];
  challengeInsights: string | null;
  serviceRecommendationsConclusion: string | null;
}

const EnhancedParagraphs: React.FC<EnhancedParagraphsProps> = ({
  paragraphs,
  challengeInsights,
  serviceRecommendationsConclusion
}) => {
  if (!paragraphs.length) return null;

  // Icons for different paragraphs
  const icons = [
    <LineChart key="line-chart" className="h-5 w-5 text-yellow-400 flex-shrink-0" />,
    <LightbulbIcon key="lightbulb" className="h-5 w-5 text-yellow-400 flex-shrink-0" />,
    <Star key="star" className="h-5 w-5 text-yellow-400 flex-shrink-0" />,
    <ChartBar key="chart-bar" className="h-5 w-5 text-yellow-400 flex-shrink-0" />,
    <TrendingUp key="trending-up" className="h-5 w-5 text-yellow-400 flex-shrink-0" />
  ];

  const result = [];
  
  // Clean paragraph labels
  const cleanedParagraphs = paragraphs.map(p => 
    p.replace(/\[PARAGRAF \d+\]\s*/gi, "")
  );
  
  // Extract the insight and conclusion text properly
  let insightText = null;
  let conclusionText = null;
  
  // Find paragraphs containing insights and conclusions
  cleanedParagraphs.forEach(paragraph => {
    if (paragraph.toUpperCase().includes("INSIGHT TANTANGAN")) {
      insightText = paragraph;
    } else if (paragraph.toUpperCase().includes("KESIMPULAN SINGKAT")) {
      conclusionText = paragraph;
    }
  });

  // Use the directly found insights and conclusions if available,
  // otherwise fall back to the parser-provided ones
  const finalInsightText = insightText || 
    (challengeInsights ? challengeInsights.replace(/\[PARAGRAF \d+\]\s*/gi, "") : null);
  const finalConclusionText = conclusionText || 
    (serviceRecommendationsConclusion ? serviceRecommendationsConclusion.replace(/\[PARAGRAF \d+\]\s*/gi, "") : null);
  
  // Render regular paragraphs
  cleanedParagraphs.forEach((paragraph, index) => {
    // Skip paragraphs that might be the insight paragraph or conclusion (we'll handle them separately)
    if (paragraph.toUpperCase().includes("INSIGHT TANTANGAN") || 
        paragraph.toUpperCase().includes("KESIMPULAN SINGKAT")) {
      return;
    }
    
    // For first paragraph, use a special highlight style
    if (index === 0) {
      result.push(
        <ParagraphWithIcon 
          key={`para-${index}`}
          text={paragraph}
          isFirst={true}
          icon={null}
        />
      );
      return;
    }
    
    // For other paragraphs, use alternating styles with icons
    const iconIndex = (index - 1) % icons.length;
    
    result.push(
      <ParagraphWithIcon 
        key={`para-${index}`}
        text={paragraph}
        icon={icons[iconIndex]}
        animationDelay={index * 200}
      />
    );
  });
  
  // Add challenge insights block if available - insert after the first paragraph for better visibility
  if (finalInsightText) {
    result.splice(1, 0, (
      <ChallengeInsightBlock 
        key="challenge-insights"
        insightText={finalInsightText}
      />
    ));
  }
  
  // Add service recommendations conclusion if available - always add at the end
  if (finalConclusionText) {
    result.push(
      <RecommendationsBlock 
        key="service-recommendations"
        recommendationsText={finalConclusionText}
      />
    );
  }
  
  return <>{result}</>;
};

export default EnhancedParagraphs;
