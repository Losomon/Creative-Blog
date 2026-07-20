export interface Topic {
  icon: 'cube' | 'code' | 'grid' | 'trend';
  title: string;
  count: number;
  description: string;
  href: string;
}

export const topics: Topic[] = [
  {
    icon: 'cube',
    title: 'Design Process',
    count: 12,
    description: 'Exploration, systems and workflows.',
    href: '/journal/topics/design-process',
  },
  {
    icon: 'code',
    title: 'Web Architecture',
    count: 9,
    description: 'Scalable, maintainable web systems.',
    href: '/journal/topics/web-architecture',
  },
  {
    icon: 'grid',
    title: 'Interface Design',
    count: 15,
    description: 'Better experiences through thoughtful UI.',
    href: '/journal/topics/interface-design',
  },
  {
    icon: 'trend',
    title: 'Performance',
    count: 7,
    description: 'Fast, accessible and resilient products.',
    href: '/journal/topics/performance',
  },
];
