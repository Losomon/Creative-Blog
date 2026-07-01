export interface Category {
  name: string;
  count: string;
  icon: string;
  color: string;
}

export interface Tutorial {
  tag: string;
  title: string;
  time: string;
  views: string;
  author: string;
  grad: string;
}

export interface Resource {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const typingWords = ["developers", "engineers", "creators", "innovators", "problem solvers"] as const;

export const categories: Category[] = [
  { name: "Frontend", count: "126 articles", icon: "🎨", color: "#6C4DF6" },
  { name: "React", count: "86 articles", icon: "⚛", color: "#61DAFB" },
  { name: "Node.js", count: "74 articles", icon: "⬡", color: "#3c873a" },
  { name: "Backend", count: "92 articles", icon: "🗄", color: "#8B5CF6" },
  { name: "AI & ML", count: "48 articles", icon: "🧠", color: "#A855F7" },
  { name: "DevOps", count: "52 articles", icon: "☁", color: "#3b82f6" },
  { name: "Career", count: "36 articles", icon: "💼", color: "#f59e0b" },
  { name: "Databases", count: "47 articles", icon: "🗃", color: "#6C4DF6" },
];

export const tutorials: Tutorial[] = [
  { tag: "JavaScript", title: "Top 10 JavaScript Array Methods", time: "7 min read", views: "2.1K views", author: "https://i.pravatar.cc/40?img=5", grad: "#1a1235,#6C4DF6" },
  { tag: "Tailwind CSS", title: "Build a Modern Landing Page", time: "12 min read", views: "3.8K views", author: "https://i.pravatar.cc/40?img=8", grad: "#0f2747,#3478c0" },
  { tag: "React", title: "React Hooks Complete Guide", time: "15 min read", views: "4.5K views", author: "https://i.pravatar.cc/40?img=22", grad: "#2b1a5e,#A855F7" },
  { tag: "TypeScript", title: "Why TypeScript Makes You Better", time: "10 min read", views: "2.9K views", author: "https://i.pravatar.cc/40?img=14", grad: "#1a2b4a,#3b82f6" },
  { tag: "Next.js", title: "Server Components Explained", time: "11 min read", views: "3.3K views", author: "https://i.pravatar.cc/40?img=19", grad: "#15151f,#6C4DF6" },
];

export const resources: Resource[] = [
  { icon: "🎁", color: "#6C4DF6", title: "Free UI Kits", desc: "Beautiful UI kits for your next project." },
  { icon: "⌥", color: "#A855F7", title: "Git Cheat Sheet", desc: "Essential Git commands in one place." },
  { icon: "🎨", color: "#3b82f6", title: "VS Code Themes", desc: "Best themes to boost your productivity." },
  { icon: "✦", color: "#8B5CF6", title: "Icons & Illustrations", desc: "Free icons and illustrations for developers." },
  { icon: "⚒", color: "#22c55e", title: "Open Source Projects", desc: "Curated list of amazing open source projects." },
];

export const faqs: FAQ[] = [
  { q: "How often do you publish new articles?", a: "We publish 3-4 new tutorials and articles every week, covering frontend, backend, and career topics." },
  { q: "Are the tutorials completely free?", a: "Yes — all core tutorials are free. We also offer optional premium deep-dives for subscribers." },
  { q: "Can I contribute to The Coding Ledger?", a: "Absolutely. We welcome guest writers — reach out via the Contact page to pitch an article." },
  { q: "Do you offer premium content?", a: "We do! Premium members get early access, downloadable resources, and exclusive guides." },
  { q: "How can I stay updated with new content?", a: "Subscribe to our weekly newsletter or follow us on social media for new releases." },
  { q: "Can I use the code from your tutorials?", a: "Yes, all code snippets are free to use in personal and commercial projects." },
];