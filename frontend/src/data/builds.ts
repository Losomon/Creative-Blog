export interface FeaturedBuild {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  href: string;
}

export const featuredBuild: FeaturedBuild = {
  category: 'Case study',
  subcategory: 'Product',
  title: 'Creative Blog Platform',
  description:
    'A focused platform for readers and writers. From concept to production — the full journey.',
  href: '/builds/creative-blog-platform',
};

export interface CaseStudy {
  title: string;
  description: string;
  date: string;
  readTime: string;
  href: string;
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'Typography Is a UX Decision',
    description: 'How type shapes trust and clarity.',
    date: 'Jun 28, 2026',
    readTime: '8 min read',
    href: '/journal/typography-is-a-ux-decision',
  },
  {
    title: 'Building a Design System',
    description: 'The foundation that scales.',
    date: 'Jun 21, 2026',
    readTime: '10 min read',
    href: '/journal/building-a-design-system',
  },
];
