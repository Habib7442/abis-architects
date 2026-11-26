"use client";

import { useLayoutEffect } from "react";
import { Switch } from "@base-ui/react/switch";
import { Moon, Sun } from "lucide-react";
import { applyThemeMode, setThemeMode, useThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Re-applies the mode once on mount. The <head> script sets it before paint; in development,
 * React's Strict Mode remount resets <html> attributes, so this puts it back (no-op in prod).
 */
export function ThemeSync() {
  useLayoutEffect(() => applyThemeMode(), []);
  return null;
}

const icon =
  "absolute size-[18px] transition-[transform,opacity] duration-300 ease-arch motion-reduce:transition-none";

/** Round 40px header button (pill border style). Sun in dark mode, moon in light mode. */
export function ThemeToggle({ className }: { className?: string }) {
  const mode = useThemeMode();

  // Mode is unknown until mounted: an empty box of the same size avoids a hydration mismatch.
  if (!mode) return <span aria-hidden className={cn("inline-block size-10 shrink-0", className)} />;

  const dark = mode === "dark";
  const next = dark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setThemeMode(next)}
      aria-label={`Switch to ${next} mode`}
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-card text-ink",
        "transition-[border-color] duration-300 ease-arch hover:border-ink/40",
        // 40px visual, 44px tap target (AGENTS §4)
        "after:absolute after:-inset-0.5 after:rounded-full",
        className,
      )}
    >
      <Sun
        aria-hidden
        strokeWidth={1.5}
        className={cn(icon, dark ? "rotate-0 opacity-100" : "-rotate-90 scale-50 opacity-0")}
      />
      <Moon
        aria-hidden
        strokeWidth={1.5}
        className={cn(icon, dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 opacity-100")}
      />
    </button>
  );
}

/** Mobile menu row: "Dark mode" with a switch. */
export function ThemeSwitchRow({ className }: { className?: string }) {
  const mode = useThemeMode();
  return (
    <label className={cn("flex min-h-16 cursor-pointer items-center justify-between gap-4 text-ink", className)}>
      <span className="text-lg font-semibold">Dark mode</span>
      {mode ? (
        <Switch.Root
          checked={mode === "dark"}
          onCheckedChange={(checked) => setThemeMode(checked ? "dark" : "light")}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-ink/15 bg-concrete-2 p-0.5",
            "transition-[background-color,border-color] duration-200 ease-arch motion-reduce:transition-none",
            "data-checked:border-gold data-checked:bg-gold",
            // 44px tap target
            "after:absolute after:-inset-x-0 after:-inset-y-2",
          )}
        >
          <Switch.Thumb
            className={cn(
              "block size-[22px] rounded-full bg-ink-fixed shadow-none",
              "transition-transform duration-200 ease-arch motion-reduce:transition-none",
              "data-checked:translate-x-5",
            )}
          />
        </Switch.Root>
      ) : (
        <span aria-hidden className="inline-block h-7 w-12" />
      )}
    </label>
  );
}
