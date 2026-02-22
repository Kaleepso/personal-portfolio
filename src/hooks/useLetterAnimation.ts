import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLetterAnimationOptions {
  text: string;
  scrollProgress: number;
  startOffset?: number;
  endOffset?: number;
}

export function useLetterAnimation({
  text,
  scrollProgress,
  startOffset = 0,
  endOffset = 0.3,
}: UseLetterAnimationOptions) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getLetterProgress = useCallback(() => {
    const adjustedProgress = Math.max(0, Math.min(1, 
      (scrollProgress - startOffset) / (endOffset - startOffset)
    ));
    return Math.floor(adjustedProgress * text.length);
  }, [scrollProgress, startOffset, endOffset, text.length]);

  useEffect(() => {
    const letterCount = getLetterProgress();
    setVisibleLetters(letterCount);
  }, [getLetterProgress]);

  const letters = text.split('').map((char, index) => ({
    char,
    index,
    isVisible: index < visibleLetters,
  }));

  return { letters, containerRef, visibleLetters };
}

export function useScrollLetterAnimation(text: string, sectionRef: React.RefObject<HTMLElement>) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start animation when section enters viewport
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate progress based on how much of the section is visible
      const visibleStart = windowHeight;
      const visibleEnd = -sectionHeight;
      const currentPos = sectionTop;
      
      const progress = Math.max(0, Math.min(1, 
        (visibleStart - currentPos) / (visibleStart - visibleEnd)
      ));

      if (progress > 0 && !hasStarted) {
        setHasStarted(true);
      }

      if (hasStarted) {
        const letterCount = Math.floor(progress * text.length);
        setVisibleLetters(letterCount);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [text, sectionRef, hasStarted]);

  const letters = text.split('').map((char, index) => ({
    char,
    index,
    isVisible: index < visibleLetters,
  }));

  return { letters, visibleLetters, hasStarted };
}
