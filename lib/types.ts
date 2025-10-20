// lib/types.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github_url?: string;
  demo_url?: string;
}

export interface Request {
  id: number;
  client: string;
  email: string;
  projectTitle: string;
  message: string;
  status: 'pending' | 'reviewed' | 'done';
}
