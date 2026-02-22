import { useEffect, useRef, useState } from 'react';
import { createTimeline, stagger } from 'animejs';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const timeline = createTimeline();

    // Animate headline letters
    const letters = headlineRef.current?.querySelectorAll('.hero-letter');
    if (letters && letters.length > 0) {
      timeline.add(letters, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 50, to: 0 },
        rotateX: { from: -90, to: 0 },
        ease: 'outExpo',
        duration: 800,
        delay: stagger(50),
      });
    }

    // Animate role text
    if (roleRef.current) {
      timeline.add(roleRef.current, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 30, to: 0 },
        ease: 'outExpo',
        duration: 600,
      }, '-=400');
    }

    // Animate CTA
    if (ctaRef.current) {
      timeline.add(ctaRef.current, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 20, to: 0 },
        ease: 'outExpo',
        duration: 600,
      }, '-=300');
    }

    // Animate scroll indicator
    timeline.add('.scroll-indicator', {
      opacity: { from: 0, to: 1 },
      ease: 'outExpo',
      duration: 400,
    }, '-=200');
  }, [isLoaded]);

  const headline = "Eddie Ndegwa";
  const letters = headline.split('');

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Animated gradient orb */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 122, 0, 0.3) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pixel Font Headline */}
        <h1
          ref={headlineRef}
          className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-relaxed"
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="hero-letter inline-block opacity-0"
              style={{ 
                whiteSpace: letter === ' ' ? 'pre' : 'normal',
                color: index < 5 ? '#FF7A00' : '#FFFFFF'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Role */}
        <p
          ref={roleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-4 opacity-0"
        >
          BBIT Student at Strathmore University
        </p>

        <p
          ref={roleRef}
          className="text-base sm:text-lg text-[#FF7A00] mb-10 opacity-0"
        >
          Aspiring Software Developer
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glow px-8 py-4 bg-[#FF7A00] text-black font-bold rounded-lg hover:bg-[#ff9933] transition-colors relative overflow-hidden"
          >
            View My Work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[#FF7A00] transition-colors"
        >
          <span className="text-xs font-pixel">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-[#FF7A00]/30 hidden lg:block" />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 border-[#FF7A00]/30 hidden lg:block" />
    </section>
  );
}
