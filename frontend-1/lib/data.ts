import type { Article, CategoryInfo, Resource, TeamMember, Faq, Stat } from "./types";

export const articles: Article[] = [
  { title: "Building a REST API with Node.js & Express", desc: "A complete walkthrough of routing, middleware, and error handling.", cat: "Backend", time: "10 min read", views: "5.2K views", img: "https://picsum.photos/id/119/500/360", author: "https://i.pravatar.cc/40?img=12" },
  { title: "Designing a Dashboard Users Love", desc: "Layout, hierarchy, and micro-interactions for data-heavy UI.", cat: "Frontend", time: "9 min read", views: "3.9K views", author: "https://i.pravatar.cc/40?img=25", img: "https://picsum.photos/id/48/500/360" },
  { title: "State Management in React Explained", desc: "Context, Redux, and Zustand — when to reach for each one.", cat: "Frontend", time: "8 min read", views: "6.1K views", author: "https://i.pravatar.cc/40?img=22", img: "https://picsum.photos/id/180/500/360" },
  { title: "Deploying a Full-Stack App with Docker & Render", desc: "Containerize, ship, and scale your side project properly.", cat: "DevOps", time: "11 min read", views: "4.4K views", author: "https://i.pravatar.cc/40?img=33", img: "https://picsum.photos/id/1/500/360" },
  { title: "MongoDB Aggregation Pipeline Explained", desc: "Turn messy collections into clean, query-ready data.", cat: "Databases", time: "9 min read", views: "2.8K views", author: "https://i.pravatar.cc/40?img=15", img: "https://picsum.photos/id/60/500/360" },
  { title: "Top 10 JavaScript Array Methods", desc: "The methods that quietly replace half your for-loops.", cat: "Frontend", time: "7 min read", views: "7.5K views", author: "https://i.pravatar.cc/40?img=5", img: "https://picsum.photos/id/119/500/361" },
  { title: "Build a Modern Landing Page with Tailwind", desc: "Utility-first CSS without the utility-class soup.", cat: "Frontend", time: "12 min read", views: "3.1K views", author: "https://i.pravatar.cc/40?img=8", img: "https://picsum.photos/id/48/500/361" },
  { title: "React Hooks: The Complete Guide", desc: "useState to custom hooks, with the pitfalls nobody tells you.", cat: "Frontend", time: "15 min read", views: "8.9K views", author: "https://i.pravatar.cc/40?img=22", img: "https://picsum.photos/id/180/500/361" },
  { title: "Why TypeScript Makes You a Better Developer", desc: "Types as documentation, not just as a compile step.", cat: "Backend", time: "10 min read", views: "4.0K views", author: "https://i.pravatar.cc/40?img=14", img: "https://picsum.photos/id/60/500/361" },
  { title: "Server Components Explained", desc: "What actually runs on the server in the App Router.", cat: "Frontend", time: "11 min read", views: "3.6K views", author: "https://i.pravatar.cc/40?img=19", img: "https://picsum.photos/id/1/500/361" },
  { title: "A Practical Guide to CI/CD Pipelines", desc: "From git push to production, without the anxiety.", cat: "DevOps", time: "13 min read", views: "2.5K views", author: "https://i.pravatar.cc/40?img=33", img: "https://picsum.photos/id/119/500/362" },
  { title: "Prompting Patterns for LLM-Powered Apps", desc: "Structuring prompts like you structure code.", cat: "AI & ML", time: "9 min read", views: "5.7K views", author: "https://i.pravatar.cc/40?img=44", img: "https://picsum.photos/id/1/500/362" },
  { title: "Reading a Job Description Like an Engineer", desc: "What \u201c5 years experience\u201d actually signals \u2014 and what to ask.", cat: "Career", time: "6 min read", views: "9.2K views", author: "https://i.pravatar.cc/40?img=51", img: "https://picsum.photos/id/60/500/362" },
  { title: "Indexing Strategies That Actually Matter", desc: "Stop guessing \u2014 read the query plan instead.", cat: "Databases", time: "10 min read", views: "2.2K views", author: "https://i.pravatar.cc/40?img=15", img: "https://picsum.photos/id/48/500/362" },
  { title: "Fine-Tuning vs. RAG: Choosing the Right Tool", desc: "Two very different answers to \u201cmake the model know more.\u201d", cat: "AI & ML", time: "12 min read", views: "4.8K views", author: "https://i.pravatar.cc/40?img=44", img: "https://picsum.photos/id/180/500/362" },
];

export const categoryList: string[] = ["All", "Frontend", "Backend", "DevOps", "Databases", "AI & ML", "Career"];

export const categories: CategoryInfo[] = [
  { name: "Frontend", count: "126 articles", icon: "🎨", color: "#6C4DF6", img: "https://picsum.photos/id/48/500/400", desc: "UI, CSS, accessibility, and everything users touch." },
  { name: "React", count: "86 articles", icon: "⚛", color: "#0ea5e9", img: "https://picsum.photos/id/180/500/400", desc: "Hooks, state, server components, and the ecosystem." },
  { name: "Node.js", count: "74 articles", icon: "⬡", color: "#3c873a", img: "https://picsum.photos/id/119/500/400", desc: "Runtime internals, APIs, and backend patterns." },
  { name: "Backend", count: "92 articles", icon: "🗄", color: "#8B5CF6", img: "https://picsum.photos/id/1/500/400", desc: "Architecture, auth, and building things that scale." },
  { name: "AI & ML", count: "48 articles", icon: "🧠", color: "#A855F7", img: "https://picsum.photos/id/2/500/400", desc: "LLMs, prompting, and shipping AI features responsibly." },
  { name: "DevOps", count: "52 articles", icon: "☁", color: "#3b82f6", img: "https://picsum.photos/id/60/500/400", desc: "CI/CD, containers, and infrastructure that doesn\u2019t page you at 3am." },
  { name: "Career", count: "36 articles", icon: "💼", color: "#f59e0b", img: "https://picsum.photos/id/26/500/400", desc: "Interviews, negotiation, and growing without burning out." },
  { name: "Databases", count: "47 articles", icon: "🗃", color: "#6C4DF6", img: "https://picsum.photos/id/180/500/401", desc: "Schema design, indexing, and query performance." },
];

export const cheatSheets: Resource[] = [
  { icon: "⌥", color: "#6C4DF6", title: "Git Cheat Sheet", desc: "Every command you actually use, on one page.", badge: "PDF" },
  { icon: "{}", color: "#8B5CF6", title: "Regex Quick Reference", desc: "Patterns, flags, and lookaheads without the headache.", badge: "PDF" },
  { icon: "⌘", color: "#A855F7", title: "VS Code Shortcuts", desc: "The 40 shortcuts that actually save time.", badge: "PDF" },
  { icon: "⚡", color: "#3b82f6", title: "HTTP Status Codes", desc: "What each code means and when to use it.", badge: "Web" },
];

export const designResources: Resource[] = [
  { icon: "🎁", color: "#6C4DF6", title: "Free UI Kits", desc: "Component kits for Figma and Sketch.", badge: "Figma" },
  { icon: "✦", color: "#A855F7", title: "Icons & Illustrations", desc: "Free icon sets and hand-drawn illustrations.", badge: "SVG" },
  { icon: "🎨", color: "#3b82f6", title: "VS Code Themes", desc: "Editor themes that are easy on the eyes.", badge: "Theme" },
  { icon: "📐", color: "#8B5CF6", title: "Design Token Starter", desc: "A CSS variable system to start any project.", badge: "CSS" },
];

export const ossResources: Resource[] = [
  { icon: "⚒", color: "#22c55e", title: "Open Source Starters", desc: "Curated boilerplates worth forking.", badge: "GitHub" },
  { icon: "🔧", color: "#3c873a", title: "Awesome Dev Tools", desc: "A living list of tools we actually use.", badge: "List" },
  { icon: "🧩", color: "#16a34a", title: "Component Libraries", desc: "Battle-tested, accessible, and unstyled.", badge: "npm" },
  { icon: "📦", color: "#059669", title: "Self-Hosting Guides", desc: "Run your own stack without the SaaS bill.", badge: "Guide" },
];

export const learnResources: Resource[] = [
  { icon: "🎓", color: "#f59e0b", title: "Free Course Roundup", desc: "The best free courses, sorted by topic.", badge: "List" },
  { icon: "📺", color: "#ea580c", title: "YouTube Channels Worth Subscribing To", desc: "Signal, not noise.", badge: "List" },
  { icon: "📚", color: "#d97706", title: "Reading List", desc: "Books that changed how we write software.", badge: "List" },
  { icon: "🧪", color: "#f97316", title: "Practice Platforms", desc: "Where to actually apply what you learn.", badge: "List" },
];

export const homeResources: Resource[] = [
  { icon: "🎁", color: "#6C4DF6", title: "Free UI Kits", desc: "Beautiful UI kits for your next project.", badge: "Figma" },
  { icon: "⌥", color: "#A855F7", title: "Git Cheat Sheet", desc: "Essential Git commands in one place.", badge: "PDF" },
  { icon: "🎨", color: "#3b82f6", title: "VS Code Themes", desc: "Best themes to boost your productivity.", badge: "Theme" },
  { icon: "✦", color: "#8B5CF6", title: "Icons & Illustrations", desc: "Free icons and illustrations for developers.", badge: "SVG" },
  { icon: "⚒", color: "#22c55e", title: "Open Source Projects", desc: "Curated list of amazing open source projects.", badge: "GitHub" },
];

export const team: TeamMember[] = [
  { name: "Solomon Mboni", role: "Founder & Editor", img: "https://i.pravatar.cc/300?img=51" },
  { name: "Amara Chen", role: "Frontend & Design", img: "https://i.pravatar.cc/300?img=47" },
  { name: "Diego Fernandez", role: "Backend & DevOps", img: "https://i.pravatar.cc/300?img=33" },
  { name: "Priya Nair", role: "Career & Community", img: "https://i.pravatar.cc/300?img=44" },
];

export const homeFaqs: Faq[] = [
  { q: "How often do you publish new articles?", a: "We publish 3-4 new tutorials and articles every week, covering frontend, backend, and career topics." },
  { q: "Are the tutorials completely free?", a: "Yes \u2014 all core tutorials are free. We also offer optional premium deep-dives for subscribers." },
  { q: "Can I contribute to The Coding Ledger?", a: "Absolutely. We welcome guest writers \u2014 reach out via the Contact page to pitch an article." },
  { q: "Do you offer premium content?", a: "We do! Premium members get early access, downloadable resources, and exclusive guides." },
  { q: "How can I stay updated with new content?", a: "Subscribe to our weekly newsletter or follow us on social media for new releases." },
  { q: "Can I use the code from your tutorials?", a: "Yes, all code snippets are free to use in personal and commercial projects." },
];

export const contactFaqs: Faq[] = [
  { q: "How long until I hear back?", a: "Usually within 2 business days. Article pitches can take a little longer since an editor reviews each one." },
  { q: "Do you accept guest posts?", a: "Yes \u2014 check the About page for what we look for, then send a pitch through this form or that page." },
  { q: "Found a typo or bug in an article?", a: "Select \u201cCorrection / typo\u201d as the topic and include the article title and a link if you have it." },
  { q: "Can I advertise or sponsor a newsletter issue?", a: "Select \u201cPartnership\u201d and tell us a bit about what you have in mind." },
];

export const stats: Stat[] = [
  { count: 120, suffix: "+", label: "Tutorials", sub: "In-depth guides" },
  { count: 50, suffix: "+", label: "Projects", sub: "Real-world projects" },
  { count: 15, suffix: "K", label: "Subscribers", sub: "Growing community" },
  { count: 500, suffix: "K", label: "Monthly Readers", sub: "Across the globe" },
];
