import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const skills = [
  { name: 'HTML5', icon: 'html', category: 'frontend' },
  { name: 'CSS3', icon: 'css', category: 'frontend' },
  { name: 'JavaScript', icon: 'javascript', category: 'language' },
  { name: 'C++', icon: 'cpp', category: 'language' },
  { name: 'PHP', icon: 'php', category: 'backend' },
  { name: 'SQL', icon: 'sql', category: 'database' },
  { name: 'Lua', icon: 'lua', category: 'language' },
  { name: 'Web Design', icon: 'design', category: 'design' },
  { name: 'Animation', icon: 'animation', category: 'design' },
];

function SkillIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    html: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    ),
    css: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
    cpp: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.271-.616.271-.91V6.91c0-.294-.104-.62-.271-.91zM12 19.11c-3.92 0-7.11-3.19-7.11-7.11 0-3.92 3.19-7.11 7.11-7.11 3.92 0 7.11 3.19 7.11 7.11 0 3.92-3.19 7.11-7.11 7.11zm4.5-6.71h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1zm-5 0h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1z"/>
      </svg>
    ),
    php: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M7.01 10.71h1.74c.23 0 .43.03.6.09.17.06.31.15.42.27.11.12.19.27.24.45.05.18.08.39.08.63 0 .34-.04.64-.13.89-.09.25-.21.46-.37.62-.16.16-.35.28-.57.36-.22.08-.46.12-.73.12H6.09v-4.43h.92v.01zm5.46 0h1.74c.23 0 .43.03.6.09.17.06.31.15.42.27.11.12.19.27.24.45.05.18.08.39.08.63 0 .34-.04.64-.13.89-.09.25-.21.46-.37.62-.16.16-.35.28-.57.36-.22.08-.46.12-.73.12h-2.2v-4.43h.92v.01zm6.91 1.41c0-.25-.04-.46-.13-.63-.09-.17-.21-.31-.37-.41-.16-.1-.35-.17-.57-.21-.22-.04-.46-.06-.72-.06h-1.08v2.65h.92c.3 0 .56-.03.78-.09.22-.06.4-.15.55-.27.15-.12.26-.27.33-.45.07-.18.11-.39.11-.63h.28v.1zm-10.37 0c0-.25-.04-.46-.13-.63-.09-.17-.21-.31-.37-.41-.16-.1-.35-.17-.57-.21-.22-.04-.46-.06-.72-.06h-1.08v2.65h.92c.3 0 .56-.03.78-.09.22-.06.4-.15.55-.27.15-.12.26-.27.33-.45.07-.18.11-.39.11-.63h.28v.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.29 14.14H7.56v-7.2h2.15v7.2zm5.46 0h-2.15v-2.35h-2.2v2.35H9.23v-7.2h2.15v2.6h2.2v-2.6h2.15v7.2h.48z"/>
      </svg>
    ),
    sql: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    lua: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.048 4.025a3 3 0 01-4.293-4.185 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"/>
      </svg>
    ),
    animation: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/>
      </svg>
    ),
  };

  return icons[icon] || icons.html;
}

export function Skills() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const timeline = createTimeline();

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

    // Animate skill cards with stagger
    const skillCards = gridRef.current?.querySelectorAll('.skill-card');
    if (skillCards && skillCards.length > 0) {
      timeline.add(skillCards, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.8, to: 1 },
        translateY: { from: 40, to: 0 },
        ease: 'outExpo',
        duration: 600,
        delay: stagger(80),
      }, '-=300');
    }
  }, [isVisible]);

  const title = "My Skills";
  const titleLetters = title.split('');

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-pixel text-xl sm:text-2xl md:text-3xl text-white mb-16 text-center"
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

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 opacity-0"
            >
              <div className="skill-icon text-[#FF7A00] mb-4">
                <SkillIcon icon={skill.icon} />
              </div>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-lg">
            Always learning, always growing. Currently exploring{' '}
            <span className="text-[#FF7A00]">React</span>,{' '}
            <span className="text-[#FF7A00]">TypeScript</span>, and{' '}
            <span className="text-[#FF7A00]">Node.js</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
