import type {
  Category,
  FAQ,
  FeaturedArticleData,
  LearningPath,
  NavLink,
  Resource,
  StatItem,
  Testimonial,
  TrendingArticle,
  Tutorial,
} from "./types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const TYPING_WORDS = [
  "developers",
  "engineers",
  "creators",
  "innovators",
  "problem solvers",
] as const;

export const STATS: StatItem[] = [
  { label: "Tutorials", sub: "In-depth guides", value: 120, suffix: "+" },
  { label: "Projects", sub: "Real-world projects", value: 50, suffix: "+" },
  { label: "Subscribers", sub: "Growing community", value: 15, suffix: "K" },
  { label: "Monthly Readers", sub: "Across the globe", value: 500, suffix: "K" },
];

export const FEATURED_ARTICLE: FeaturedArticleData = {
  title: "How I Built a Scalable Blog Platform with Next.js",
  excerpt:
    "A behind-the-scenes look at the architecture, features, and lessons learned while building The Coding Ledger from the ground up.",
  author: "Solomon Mboni",
  authorImage: "https://i.pravatar.cc/72?img=51",
  meta: "May 20, 2024 · 12 min read",
  image: "https://picsum.photos/id/180/900/700",
  video: "https://assets.mixkit.co/videos/41659/41659-720.mp4",
};

export const TRENDING_ARTICLES: TrendingArticle[] = [
  {
    title: "Building a REST API with Node.js & Express",
    category: "Web Development",
    meta: "10 min read · May 18, 2024 · hover to preview",
    image: "https://picsum.photos/id/119/700/500",
    video: "https://assets.mixkit.co/videos/41646/41646-720.mp4",
    span: "2-2",
    hoverVideo: true,
  },
  {
    title: "Designing a Dashboard Users Love",
    category: "UI/UX Design",
    meta: "9 min read · May 17, 2024",
    image: "https://picsum.photos/id/48/500/500",
    span: "1-1",
  },
  {
    title: "State Management in React Explained",
    category: "React",
    meta: "8 min read · May 15, 2024",
    image: "https://picsum.photos/id/180/500/500",
    span: "1-1",
  },
  {
    title: "Deploying a Full-Stack App with Docker & Render",
    category: "DevOps",
    meta: "11 min read · May 14, 2024",
    image: "https://picsum.photos/id/1/500/500",
    span: "1-1",
  },
  {
    title: "MongoDB Aggregation Pipeline Explained",
    category: "Databases",
    meta: "9 min read · May 13, 2024",
    image: "https://picsum.photos/id/60/500/500",
    span: "1-1",
  },
];

export const CATEGORIES: Category[] = [
  { name: "Frontend", count: "126 articles", icon: "🎨", color: "#6C4DF6" },
  { name: "React", count: "86 articles", icon: "⚛", color: "#61DAFB" },
  { name: "Node.js", count: "74 articles", icon: "⬡", color: "#3c873a" },
  { name: "Backend", count: "92 articles", icon: "🗄", color: "#8B5CF6" },
  { name: "AI & ML", count: "48 articles", icon: "🧠", color: "#A855F7" },
  { name: "DevOps", count: "52 articles", icon: "☁", color: "#3b82f6" },
  { name: "Career", count: "36 articles", icon: "💼", color: "#f59e0b" },
  { name: "Databases", count: "47 articles", icon: "🗃", color: "#6C4DF6" },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    title: "Become a Frontend Developer",
    meta: "12 Modules · Beginner to Advanced",
    progress: 25,
    steps: [
      { label: "HTML", icon: "H", color: "#e34c26" },
      { label: "CSS", icon: "C", color: "#264de4" },
      { label: "JavaScript", icon: "JS", color: "#f0db4f", textColor: "#222" },
      { label: "React", icon: "⚛", color: "#20232a" },
      { label: "Next.js", icon: "N", color: "#000" },
    ],
  },
  {
    title: "Backend Developer Roadmap",
    meta: "10 Modules · Beginner to Advanced",
    progress: 30,
    steps: [
      { label: "Node", icon: "N", color: "#3c873a" },
      { label: "Express", icon: "E", color: "#000" },
      { label: "MongoDB", icon: "M", color: "#13aa52" },
      { label: "Auth", icon: "A", color: "#6C4DF6" },
      { label: "Deployment", icon: "D", color: "#3b82f6" },
    ],
  },
];

export const TUTORIALS: Tutorial[] = [
  {
    tag: "JavaScript",
    title: "Top 10 JavaScript Array Methods",
    time: "7 min read",
    views: "2.1K views",
    author: "https://i.pravatar.cc/40?img=5",
    image: "https://picsum.photos/id/119/400/300",
  },
  {
    tag: "Tailwind CSS",
    title: "Build a Modern Landing Page",
    time: "12 min read",
    views: "3.8K views",
    author: "https://i.pravatar.cc/40?img=8",
    image: "https://picsum.photos/id/48/400/300",
  },
  {
    tag: "React",
    title: "React Hooks Complete Guide",
    time: "15 min read",
    views: "4.5K views",
    author: "https://i.pravatar.cc/40?img=22",
    image: "https://picsum.photos/id/180/400/300",
  },
  {
    tag: "TypeScript",
    title: "Why TypeScript Makes You Better",
    time: "10 min read",
    views: "2.9K views",
    author: "https://i.pravatar.cc/40?img=14",
    image: "https://picsum.photos/id/60/400/300",
  },
  {
    tag: "Next.js",
    title: "Server Components Explained",
    time: "11 min read",
    views: "3.3K views",
    author: "https://i.pravatar.cc/40?img=19",
    image: "https://picsum.photos/id/1/400/300",
  },
];

export const RESOURCES: Resource[] = [
  { icon: "🎁", color: "#6C4DF6", title: "Free UI Kits", desc: "Beautiful UI kits for your next project." },
  { icon: "⌥", color: "#A855F7", title: "Git Cheat Sheet", desc: "Essential Git commands in one place." },
  { icon: "🎨", color: "#3b82f6", title: "VS Code Themes", desc: "Best themes to boost your productivity." },
  { icon: "✦", color: "#8B5CF6", title: "Icons & Illustrations", desc: "Free icons and illustrations for developers." },
  { icon: "⚒", color: "#22c55e", title: "Open Source Projects", desc: "Curated list of amazing open source projects." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The Coding Ledger helped me go from confused to confident developer.",
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/72?img=15",
  },
  {
    quote: "The tutorials are practical, modern, and easy to follow. My go-to blog!",
    name: "Sarah Williams",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/72?img=27",
  },
  {
    quote: "I landed my dream job by following the career advice and roadmaps.",
    name: "David Miller",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/72?img=33",
  },
  {
    quote: "Clean design, great content, and super valuable resources.",
    name: "Emma Davis",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/72?img=44",
  },
];

export const FAQS: FAQ[] = [
  { q: "How often do you publish new articles?", a: "We publish 3-4 new tutorials and articles every week, covering frontend, backend, and career topics." },
  { q: "Are the tutorials completely free?", a: "Yes — all core tutorials are free. We also offer optional premium deep-dives for subscribers." },
  { q: "Can I contribute to The Coding Ledger?", a: "Absolutely. We welcome guest writers — reach out via the Contact page to pitch an article." },
  { q: "Do you offer premium content?", a: "We do! Premium members get early access, downloadable resources, and exclusive guides." },
  { q: "How can I stay updated with new content?", a: "Subscribe to our weekly newsletter or follow us on social media for new releases." },
  { q: "Can I use the code from your tutorials?", a: "Yes, all code snippets are free to use in personal and commercial projects." },
];
