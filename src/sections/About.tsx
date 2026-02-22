import { useEffect, useRef, useState } from 'react';
import { createTimeline, stagger } from 'animejs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function About() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const aboutText = `I'm a passionate BBIT student at Strathmore University with a deep interest in software development and technology. /
My journey in tech started with curiosity about how things work, which evolved into a passion for building digital solutions. /
I enjoy learning new technologies, solving problems, and creating meaningful applications that make a difference. / When I'm not coding, you'll find me exploring new tech trends, contributing to open source projects, /or collaborating with fellow developers on exciting projects.`;

  // Split on '/' to insert line breaks
  const aboutSegments = aboutText.split('/');

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const timeline = createTimeline({
      onComplete: () => setHasAnimated(true),
    });

    // Animate title
    if (titleRef.current) {
      const titleLetters = titleRef.current.querySelectorAll('.title-letter');
      if (titleLetters.length > 0) {
        timeline.add(titleLetters, {
          opacity: { from: 0, to: 1 },
          translateY: { from: 30, to: 0 },
          ease: 'outExpo',
          duration: 600,
          delay: stagger(30),
        });
      }
    }

    // Animate about text letters
    const letters = textContainerRef.current?.querySelectorAll('.about-letter');
    if (letters && letters.length > 0) {
      timeline.add(letters, {
        opacity: { from: 0, to: 1 },
        ease: 'outQuad',
        duration: 20,
        delay: stagger(8),
      }, '-=200');
    }
  }, [isVisible, hasAnimated]);

  const title = "About Me";
  const titleLetters = title.split('');
  // aboutLetters is not used anymore, we will map over aboutSegments and letters within

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-pixel text-xl sm:text-2xl md:text-3xl text-white mb-12 text-center"
        >
          {titleLetters.map((letter, index) => (
            <span
              key={index}
              className="title-letter inline-block opacity-0"
              style={{ color: '#FF7A00' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h2>

        {/* Letter-by-letter animated text with line breaks */}
        <div
          ref={textContainerRef}
          className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed text-justify"
        >
          {aboutSegments.map((segment, segIdx) => (
            <>
              {segment.split('').map((letter, index) => (
                <span
                  key={segIdx + '-' + index}
                  className="about-letter inline opacity-0"
                  style={{
                    whiteSpace: letter === ' ' ? 'pre' : 'normal',
                    color: letter === '.' || letter === ',' ? '#FF7A00' : undefined
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
              {segIdx < aboutSegments.length - 1 && <br />}
            </>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '3+', label: 'Years Learning' },
            { value: '5+', label: 'Projects' },
            { value: '5+', label: 'Languages' },
            { value: '∞', label: 'Curiosity' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center reveal-section ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <div className="font-pixel text-2xl md:text-3xl text-[#FF7A00] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
