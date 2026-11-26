import { statusLabel, type ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Status pill for use over images: dark glass pill, green dot (completed) or orange (under construction). */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 type-chip text-white backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", status === "completed" ? "bg-[#3fae6a]" : "bg-[#e0893a]")} />
      {statusLabel[status]}
    </span>
  );
}
