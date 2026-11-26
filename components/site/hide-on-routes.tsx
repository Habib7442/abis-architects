"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders children except on the given routes (and their sub-routes). */
export function HideOnRoutes({ routes, children }: { routes: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const hidden = routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  return hidden ? null : children;
}
