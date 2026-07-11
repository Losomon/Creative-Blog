// Temporary real photography via Lorem Picsum (free-to-use, no attribution required,
// backed by real Unsplash photos). Swap the `src` for your own photography whenever
// you have it — that's the better long-term fit for a "solo, authentic" publication.

export default function SitePhoto({
  seed,
  className = "",
  dark = false,
}: {
  seed: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={`https://picsum.photos/seed/${seed}/900/700`}
        alt=""
        className="h-full w-full object-cover"
        style={{
          filter: dark
            ? "saturate(0.7) brightness(0.55) sepia(0.15)"
            : "saturate(0.85) sepia(0.1) contrast(0.97)",
        }}
      />
      {/* Warm wash so varied stock photos read as one consistent palette */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(20,20,15,0.15), rgba(20,20,15,0.35))"
            : "linear-gradient(180deg, rgba(250,249,246,0.08), rgba(250,249,246,0.18))",
        }}
      />
    </div>
  );
}
