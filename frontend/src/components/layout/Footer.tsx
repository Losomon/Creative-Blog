export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 bg-ink px-8 py-8 text-sm text-white/40 sm:flex-row sm:justify-between md:px-16">
      <span>© 2026 Solo Design</span>
      <span>Built in public. Always learning.</span>
      <div className="flex gap-5">
        <a href="#" className="inline-flex items-center gap-1.5 hover:text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 hover:text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 hover:text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.18 15.64a2.18 2.18 0 01-2.18 2.18C1.78 17.82 0 16.04 0 13.64s1.78-4.18 4-4.18 4 1.78 4 4.18a2.18 2.18 0 01-2.18 2.18zm0-6.36a2.18 2.18 0 01-2.18-2.18C1.78 5.28 0 7.06 0 9.46s1.78 4.18 4 4.18 4-1.78 4-4.18a2.18 2.18 0 00-2.18-2.18zm11.64 6.36a2.18 2.18 0 01-2.18 2.18c-2.22 0-4-1.78-4-4.18s1.78-4.18 4-4.18 4 1.78 4 4.18a2.18 2.18 0 01-2.18 2.18zm0-6.36a2.18 2.18 0 01-2.18-2.18c-2.22 0-4 1.78-4 4.18s1.78 4.18 4 4.18 4-1.78 4-4.18a2.18 2.18 0 00-2.18-2.18z" />
          </svg>
          RSS
        </a>
      </div>
    </footer>
  );
}
