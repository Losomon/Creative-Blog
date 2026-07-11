export default function CalloutLine({
  label,
  align = "left",
  dark = false,
}: {
  label: string;
  align?: "left" | "right";
  dark?: boolean;
}) {
  const textColor = dark ? "text-dark-accent" : "text-blueprint";
  const lineColor = dark ? "bg-dark-accent/40" : "bg-blueprint/40";

  return (
    <div
      className={`flex items-center gap-2 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span className={`font-mono text-[10px] leading-tight ${textColor} max-w-[110px]`}>
        {label}
      </span>
      <span className={`h-px w-8 ${lineColor}`} />
    </div>
  );
}
