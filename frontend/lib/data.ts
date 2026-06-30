export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: number;
  date: string;
  image: string;
  author?: string;
  views?: string;
};

export const trendingArticles: Article[] = [
  {
    slug: "rest-api-nodejs-express",
    title: "Building a REST API with Node.js & Express",
    category: "Web Development",
    excerpt: "A comprehensive guide to building scalable REST APIs using Node.js and Express.js with best practices for production.",
    readTime: 8,
    date: "May 18, 2024",
    image: "/images/article-1.jpg",
    author: "Alex Chen",
    views: "12.4k",
  },
  {
    slug: "designing-dashboard-users-love",
    title: "Designing a Dashboard Users Love",
    category: "UI / UX Design",
    excerpt: "Learn the principles behind creating intuitive, beautiful dashboards that users actually enjoy interacting with.",
    readTime: 10,
    date: "May 17, 2024",
    image: "/images/article-2.jpg",
    author: "Sarah Miller",
    views: "9.8k",
  },
  {
    slug: "state-management-react-explained",
    title: "State Management in React Explained",
    category: "React",
    excerpt: "From useState to Zustand: when to use which state management solution in your React applications.",
    readTime: 9,
    date: "May 15, 2024",
    image: "/images/article-3.jpg",
    author: "David Kim",
    views: "15.2k",
  },
  {
    slug: "fullstack-docker-render",
    title: "Deploying a Full-Stack App with Docker & Render",
    category: "DevOps",
    excerpt: "Step-by-step guide to containerizing and deploying your full-stack application with Docker and Render.",
    readTime: 11,
    date: "May 14, 2024",
    image: "/images/article-4.jpg",
    author: "Maria Garcia",
    views: "8.1k",
  },
];

export const featuredArticle: Article = {
  slug: "future-of-web-development-2025",
  title: "The Future of Web Development in 2025",
  category: "Web Development",
  excerpt:
    "Explore the cutting-edge technologies and trends that will shape the web development landscape in the coming year. From AI-assisted coding to edge computing.",
  readTime: 12,
  date: "May 20, 2024",
  image: "/images/featured.jpg",
  author: "Alex Chen",
  views: "24.6k",
};

export const categories = [
  {
    name: "Frontend",
    icon: "LayoutTemplate",
    count: 42,
    color: "from-blue-500 to-cyan-500",
    colorHex: "#3b82f6",
  },
  {
    name: "React",
    icon: "Atom",
    count: 38,
    color: "from-cyan-500 to-teal-500",
    colorHex: "#06b6d4",
  },
  {
    name: "Node.js",
    icon: "Server",
    count: 31,
    color: "from-green-500 to-emerald-500",
    colorHex: "#22c55e",
  },
  {
    name: "Backend",
    icon: "Database",
    count: 28,
    color: "from-orange-500 to-amber-500",
    colorHex: "#f97316",
  },
  {
    name: "AI",
    icon: "Brain",
    count: 24,
    color: "from-purple-500 to-brand-600",
    colorHex: "#a855f7",
  },
  {
    name: "Cloud",
    icon: "Cloud",
    count: 19,
    color: "from-sky-500 to-blue-500",
    colorHex: "#0ea5e9",
  },
  {
    name: "DevOps",
    icon: "GitBranch",
    count: 16,
    color: "from-red-500 to-rose-500",
    colorHex: "#ef4444",
  },
  {
    name: "Design",
    icon: "Palette",
    count: 22,
    color: "from-pink-500 to-rose-500",
    colorHex: "#ec4899",
  },
  {
    name: "Career",
    icon: "Briefcase",
    count: 14,
    color: "from-yellow-500 to-orange-500",
    colorHex: "#eab308",
  },
  {
    name: "Databases",
    icon: "HardDrive",
    count: 12,
    color: "from-indigo-500 to-purple-500",
    colorHex: "#6366f1",
  },
];

export const learningPaths = [
  {
    title: "Become a Frontend Developer",
    steps: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    progress: 60,
  },
  {
    title: "Become a Fullstack Developer",
    steps: ["Node.js", "Express", "MongoDB", "Authentication", "Deployment"],
    progress: 40,
  },
  {
    title: "Become a DevOps Engineer",
    steps: ["Linux", "Docker", "CI/CD", "Kubernetes", "Cloud"],
    progress: 25,
  },
];

export const latestTutorials: Article[] = [
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    category: "TypeScript",
    excerpt: "Deep dive into TypeScript generics with practical examples and patterns.",
    readTime: 8,
    date: "May 19, 2024",
    image: "/images/tut-1.jpg",
    author: "James Wilson",
    views: "18.5k",
  },
  {
    slug: "css-grid-mastery",
    title: "CSS Grid Layout: The Complete Guide",
    category: "CSS",
    excerpt: "Everything you need to know about CSS Grid Layout in 2024.",
    readTime: 14,
    date: "May 18, 2024",
    image: "/images/tut-2.jpg",
    author: "Emily Brown",
    views: "14.2k",
  },
  {
    slug: "nextjs-app-router-guide",
    title: "Next.js App Router: The Ultimate Guide",
    category: "Next.js",
    excerpt: "Comprehensive guide to Next.js 14 App Router with server components.",
    readTime: 16,
    date: "May 17, 2024",
    image: "/images/tut-3.jpg",
    author: "Michael Lee",
    views: "21.7k",
  },
  {
    slug: "docker-for-developers",
    title: "Docker for Developers: From Zero to Hero",
    category: "DevOps",
    excerpt: "Learn Docker fundamentals and containerize your applications.",
    readTime: 11,
    date: "May 16, 2024",
    image: "/images/tut-4.jpg",
    author: "Chris Taylor",
    views: "11.3k",
  },
  {
    slug: "tailwind-v4-new-features",
    title: "Tailwind CSS v4: What's New",
    category: "CSS",
    excerpt: "Explore the new features and improvements in Tailwind CSS v4.",
    readTime: 7,
    date: "May 15, 2024",
    image: "/images/tut-5.jpg",
    author: "Anna White",
    views: "16.9k",
  },
  {
    slug: "prisma-orm-guide",
    title: "Prisma ORM: The Modern Way to Query Databases",
    category: "Databases",
    excerpt: "Learn how Prisma simplifies database access in Node.js applications.",
    readTime: 10,
    date: "May 14, 2024",
    image: "/images/tut-6.jpg",
    author: "Tom Harris",
    views: "9.4k",
  },
];

export const developerResources = [
  {
    title: "Free UI Kit",
    description: "A comprehensive UI component library for rapid prototyping.",
    icon: "Palette",
    color: "from-brand-500 to-brand-600",
  },
  {
    title: "Git Cheat Sheet",
    description: "Essential Git commands every developer should know.",
    icon: "FileCode",
    color: "from-orange-500 to-pink-600",
  },
  {
    title: "VS Code Themes",
    description: "Curated collection of beautiful VS Code themes.",
    icon: "Monitor",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Icon Library",
    description: "Free, high-quality icons for your next project.",
    icon: "Smile",
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Open Source Projects",
    description: "Top open source projects to contribute to in 2024.",
    icon: "Github",
    color: "from-purple-500 to-brand-600",
  },
  {
    title: "Dev Books",
    description: "Must-read books for modern software developers.",
    icon: "BookOpen",
    color: "from-red-500 to-orange-600",
  },
];

export const testimonials = [
  {
    quote:
      "The Coding Ledger helped me land my first frontend job. The tutorials are incredibly well-structured and practical.",
    author: "Sarah Johnson",
    role: "Frontend Developer @ Company",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
  },
  {
    quote:
      "I've been coding for 5 years, and this is still my go-to resource for staying current with best practices.",
    author: "Michael Chen",
    role: "Senior Engineer @ TechCorp",
    avatar: "/avatars/michael.jpg",
    rating: 5,
  },
  {
    quote:
      "The learning paths are game-changing. I went from junior to mid-level developer in just 6 months.",
    author: "Alex Rivera",
    role: "Fullstack Developer @ Startup",
    avatar: "/avatars/alex.jpg",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How often do you publish new articles?",
    answer:
      "We publish 3-5 new articles every week, covering everything from beginner tutorials to advanced engineering concepts. Our team of experienced developers ensures every piece is accurate, practical, and up-to-date with current industry standards.",
  },
  {
    question: "Are the tutorials and resources really free?",
    answer:
      "Yes! All our tutorials, articles, and resources are completely free. We also offer a premium subscription with exclusive deep-dives, video courses, and a private community for developers who want to take their skills further.",
  },
  {
    question: "Can I contribute to The Coding Ledger?",
    answer:
      "Absolutely! We welcome guest authors and technical contributors. Whether you want to write articles, suggest tutorials, or contribute to our open-source resources, we'd love to have you. Reach out to us through the contact page.",
  },
  {
    question: "How do I join the community?",
    answer:
      "Join our community by subscribing to our newsletter, following us on social media, or becoming a premium member. We have active Discord and Slack communities where developers share knowledge, ask questions, and network.",
  },
];

export const stats = [
  { label: "Tutorials", value: 120, suffix: "+" },
  { label: "Projects", value: 50, suffix: "+" },
  { label: "Subscribers", value: 15, suffix: "K+" },
  { label: "Monthly Readers", value: 500, suffix: "K+" },
];
