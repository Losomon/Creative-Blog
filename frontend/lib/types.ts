export interface Article {
  title: string;
  desc: string;
  cat: Category;
  time: string;
  views: string;
  img: string;
  author: string;
}

export type Category =
  | "Frontend"
  | "React"
  | "Node.js"
  | "Backend"
  | "AI & ML"
  | "DevOps"
  | "Career"
  | "Databases";

export interface CategoryInfo {
  name: Category;
  count: string;
  icon: string;
  color: string;
  img: string;
  desc: string;
}

export interface Resource {
  icon: string;
  color: string;
  title: string;
  desc: string;
  badge: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Stat {
  count: number;
  suffix: string;
  label: string;
  sub: string;
}
