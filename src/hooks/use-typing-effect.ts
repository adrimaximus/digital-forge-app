
import { useState, useEffect, useRef } from 'react';
import { cleanupIndonesianText } from '@/utils/ai/textCleanup';

interface UseTypingEffectProps {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  enabled?: boolean;
  cleanup?: boolean;
  maxTypingDuration?: number;
}

interface UseTypingEffectReturn {
  displayedText: string;
  isTyping: boolean;
  fullText: string;
}

export const useTypingEffect = ({
  text, 
  typingSpeed = 10,
  onComplete,
  enabled = true,
  cleanup = true,
  maxTypingDuration = 15000
}: UseTypingEffectProps): UseTypingEffectReturn => {
  // Skip typing animation and immediately display the full text
  const processedText = cleanup ? cleanupIndonesianText(text) : text;
  
  useEffect(() => {
    // Call onComplete immediately to ensure proper state updates
    if (text && onComplete) {
      onComplete();
    }
  }, [text, onComplete]);

  return {
    displayedText: processedText,
    isTyping: false, // Always return false for isTyping
    fullText: processedText
  };
};
