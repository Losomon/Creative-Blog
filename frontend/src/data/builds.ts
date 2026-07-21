export interface FeaturedBuild {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export const featuredBuild: FeaturedBuild = {
  category: 'Case study',
  subcategory: 'Product',
  title: 'Creative Blog Platform',
  description:
    'A focused platform for readers and writers. From concept to production — the full journey.',
  href: '/builds/creative-blog-platform',
  image:
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=650&fit=crop&q=80',
};

export interface CaseStudy {
  title: string;
  description: string;
  date: string;
  readTime: string;
  href: string;
  image: string;
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'Typography Is a UX Decision',
    description: 'How type shapes trust and clarity.',
    date: 'Jun 28, 2026',
    readTime: '8 min read',
    href: '/journal/typography-is-a-ux-decision',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799c315ec7?w=600&h=400&fit=crop&q=80',
  },
  {
    title: 'Building a Design System',
    description: 'The foundation that scales.',
    date: 'Jun 21, 2026',
    readTime: '10 min read',
    href: '/journal/building-a-design-system',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&q=80',
  },
];
