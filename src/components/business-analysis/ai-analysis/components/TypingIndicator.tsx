
import React from 'react';
import { Sparkles } from 'lucide-react';

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping }) => {
  // Always return null to completely disable the typing indicator
  return null;
};

export default TypingIndicator;
