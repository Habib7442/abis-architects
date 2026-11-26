import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Label chip for light sections (DESIGN §7.20): white pill, hairline border, ink icon + text.
 * Render as a heading with `as="h2"` when it names the section.
 */
export function Chip<T extends ElementType = "p">({
  as,
  icon,
  children,
  className,
  ...props
}: { as?: T; icon?: ReactNode; children: ReactNode; className?: string } & Omit<
  ComponentProps<T>,
  "as" | "children" | "className"
>) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 type-chip text-ink [&_svg]:size-3.5",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Tag>
  );
}

/** Eyebrow for dark sections (DESIGN §7.20): gold text with a short rule. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 type-chip text-gold", className)}>
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
