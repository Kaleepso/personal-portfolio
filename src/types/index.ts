export interface Skill {
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'tool';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'coming-soon' | 'completed';
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

export interface ContactLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
