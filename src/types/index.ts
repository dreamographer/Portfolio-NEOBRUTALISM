export interface Project {
  id: string;
  title: string;
  type?: "personal" | "professional";
  company?: string;
  subTitle: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  linkedin?: string;
  github?: string;
  live?: string;
  features: string[];
}
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category?: string;
}

export interface AboutInfo {
  description: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
}
