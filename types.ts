export enum ViewState {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  image: string;
  link: string;
  features: string[];
  year: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
}