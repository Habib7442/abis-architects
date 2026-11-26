"use client";

/**
 * Inline <script> that runs during HTML parsing (server render) but is inert when React renders
 * on the client, so React doesn't warn about script tags. Pattern from the Next.js guide
 * "Preventing flash before hydration"; suppressHydrationWarning covers the type mismatch.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
