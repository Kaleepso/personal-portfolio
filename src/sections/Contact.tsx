import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const contactLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Kaleepso',
    icon: Github,
    description: 'Check out my code',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/eddie-ndegwa-772a993a8/',
    icon: Linkedin,
    description: 'Connect professionally',
  },
  {
    name: 'Email',
    url: 'https://mail.google.com/mail/?view=cm&to=eddie.ndegwa@strathmore.edu',
    icon: Mail,
    description: 'Send me a message',
  },
];

export function Contact() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

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

    // Animate content
    if (contentRef.current) {
      timeline.add(contentRef.current, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 40, to: 0 },
        ease: 'outExpo',
        duration: 800,
      }, '-=300');
    }

    // Animate contact links
    const linkCards = linksRef.current?.querySelectorAll('.contact-link');
    if (linkCards && linkCards.length > 0) {
      timeline.add(linkCards, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.9, to: 1 },
        translateY: { from: 30, to: 0 },
        ease: 'outExpo',
        duration: 600,
        delay: stagger(100),
      }, '-=400');
    }
  }, [isVisible]);

  const title = "Get In Touch";
  const titleLetters = title.split('');

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255, 122, 0, 0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-pixel text-xl sm:text-2xl md:text-3xl text-white mb-8 text-center"
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

        {/* Description */}
        <div ref={contentRef} className="text-center mb-12 opacity-0">
          <p className="text-lg text-white/70 mb-4">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <p className="text-white/50">
            Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Contact Links */}
        <div
          ref={linksRef}
          className="grid sm:grid-cols-3 gap-6"
        >
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="contact-link group flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 opacity-0"
              {...(link.name === 'Email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <div className="w-14 h-14 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF7A00]/20 group-hover:scale-110 transition-all duration-300">
                <link.icon className="w-7 h-7 text-[#FF7A00]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FF7A00] transition-colors">
                {link.name}
              </h3>
              <p className="text-sm text-white/50 text-center">
                {link.description}
              </p>
              <ExternalLink className="w-4 h-4 text-white/30 mt-3 group-hover:text-[#FF7A00] transition-colors" />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="text-sm text-white/50">Available for collaborations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
