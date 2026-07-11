export default function PhotoPlaceholder({
  className = "",
  dark = false,
  label,
}: {
  className?: string;
  dark?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: dark
          ? "repeating-linear-gradient(135deg, #1c1b16, #1c1b16 10px, #201f19 10px, #201f19 20px)"
          : "repeating-linear-gradient(135deg, #EFEBE2, #EFEBE2 10px, #E6E1D5 10px, #E6E1D5 20px)",
      }}
    >
      {label && (
        <span
          className={`absolute bottom-2 right-2 font-mono text-[9px] tracking-wide ${
            dark ? "text-dark-text/40" : "text-ink-faint"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
