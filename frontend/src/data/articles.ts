export interface Article {
  slug: string;
  category: string;
  subcategory: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
}

export const latestArticle: Article = {
  slug: 'designing-before-coding',
  category: 'Process',
  subcategory: 'Architecture',
  date: 'Jul 04, 2026',
  readTime: '12 min read',
  title: 'Designing Before Coding',
  excerpt:
    'Start with structure, not syntax. How a clear design system saves hundreds of decisions later.',
};

export interface BuildLogEntry {
  date: string;
  text: string;
}

export const buildLog: BuildLogEntry[] = [
  { date: 'Jul 06', text: 'Refined article layout and reading rhythm.' },
  { date: 'Jul 04', text: 'Improved typography scale and line length.' },
  { date: 'Jul 01', text: 'Initial release of the new homepage.' },
];

export interface FieldNote {
  title: string;
  date: string;
  readTime: string;
}

export const fieldNotes: FieldNote[] = [
  { title: 'Design Rules I Keep Breaking', date: 'Jul 02', readTime: '4 min read' },
  { title: 'Why Constraints Create Better Work', date: 'Jun 25', readTime: '3 min read' },
  { title: 'The Beauty of Iterative Design', date: 'Jun 18', readTime: '5 min read' },
  { title: 'Code as a Creative Medium', date: 'Jun 10', readTime: '4 min read' },
];
