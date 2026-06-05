export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  liveUrl: string;
  repoUrl: string;
  stack: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  description: string;
  category: 'language' | 'tool';  
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    profileImage: string;
    role: string;
    bio: string;
    about: string;
    email: string;
    github: string;
    linkedin: string;
    cvLink: string;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}
