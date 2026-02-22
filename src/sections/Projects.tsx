import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern, animation-focused personal portfolio built with React, TypeScript, and Anime.js.',
    status: 'completed' as const,
    githubUrl: '#',
    liveUrl: '#',
    technologies: ['React', 'TypeScript', 'Anime.js', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Student Management System',
    description: 'A web-based system for managing student records, grades, and course enrollments.',
    status: 'coming-soon' as const,
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product catalog, cart, and checkout functionality.',
    status: 'coming-soon' as const,
    technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
  },
  {
    id: 4,
    title: 'Chat Application',
    description: 'Real-time messaging app with user authentication and message persistence.',
    status: 'coming-soon' as const,
    technologies: ['Socket.io', 'Node.js', 'Express', 'MongoDB'],
  },
];

export function Projects() {
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

    // Animate project cards
    const projectCards = gridRef.current?.querySelectorAll('.project-card');
    if (projectCards && projectCards.length > 0) {
      timeline.add(projectCards, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 60, to: 0 },
        ease: 'outExpo',
        duration: 800,
        delay: stagger(150),
      }, '-=300');
    }
  }, [isVisible]);

  const title = "Projects";
  const titleLetters = title.split('');

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 opacity-10 -translate-y-1/2">
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

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 card-lift opacity-0"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    project.status === 'completed'
                      ? 'bg-[#FF7A00]/20 text-[#FF7A00]'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {project.status === 'completed' ? 'LIVE' : 'COMING SOON'}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-[#FF7A00]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF7A00] transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-white/5 text-white/50 rounded border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-white/50 hover:text-[#FF7A00] transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.liveUrl && project.status === 'completed' && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-white/50 hover:text-[#FF7A00] transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(255, 122, 0, 0.1)',
                }}
              />
            </div>
          ))}
        </div>

        {/* More projects hint */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            More projects coming soon... Check my{' '}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF7A00] hover:underline"
            >
              GitHub
            </a>{' '}
            for updates!
          </p>
        </div>
      </div>
    </section>
  );
}
