import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("max-w-3xl", centered && "mx-auto text-center")}
    >
      {badge && (
        <span
          className={cn(
            "mb-4 inline-block px-3 py-1 rounded-full text-sm font-medium",
            light
              ? "bg-white/20 text-white"
              : "badge-primary"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-display-md mb-4",
          light ? "text-white" : "text-stone-900"
        )}
      >
        {title}{" "}
        {titleHighlight && (
          <span
            className={
              light ? "text-sand-200" : "text-highlight"
            }
          >
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light ? "text-white/70" : "text-stone-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
