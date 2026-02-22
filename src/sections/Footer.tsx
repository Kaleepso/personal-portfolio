import { Heart } from 'lucide-react';

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="font-pixel text-sm text-white hover:text-[#FF7A00] transition-colors"
          >
            Eddie Ndegwa
          </a>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${link.toLowerCase()}`);
                }}
                className="text-sm text-white/50 hover:text-[#FF7A00] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-white/40">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" />
            <span>by Eddie</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Eddie Ndegwa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
