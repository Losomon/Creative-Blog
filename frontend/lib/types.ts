export type ToastType = "success" | "info" | "error";

export interface NavLink {
  href: string;
  label: string;
}

export interface StatItem {
  label: string;
  sub: string;
  value: number;
  suffix: string;
}

export interface Category {
  name: string;
  count: string;
  icon: string;
  color: string;
}

export interface TrendingArticle {
  title: string;
  category: string;
  meta: string;
  image: string;
  video?: string;
  span: "2-2" | "1-1";
  hoverVideo?: boolean;
}

export interface FeaturedArticleData {
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  meta: string;
  image: string;
  video: string;
}

export interface Tutorial {
  tag: string;
  title: string;
  time: string;
  views: string;
  author: string;
  image: string;
}

export interface Resource {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface LearningPathStep {
  label: string;
  icon: string;
  color: string;
  textColor?: string;
}

export interface LearningPath {
  title: string;
  meta: string;
  steps: LearningPathStep[];
  progress: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FAQ {
  q: string;
  a: string;
}
