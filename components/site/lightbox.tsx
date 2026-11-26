"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SWIPE_PX = 50;

export type LightboxItem = {
  key: string;
  src: string;
  alt: string;
  title: string;
  /** Small gold label above the title (category, "3D design"…). */
  label?: string;
  /** Extra line under the title (location, status badge…). */
  meta?: ReactNode;
};

/**
 * Full-screen dark image viewer shared by "Our projects" and "Design vs Reality".
 * Base UI Dialog: Esc closes, focus is trapped and returns to the opener. Arrow keys, the
 * on-screen arrows and a horizontal swipe move through `items` (wrapping). The whole image is
 * shown (object-contain).
 */
export function Lightbox({
  items,
  index,
  onIndex,
  noun = "image",
}: {
  items: LightboxItem[];
  index: number | null;
  onIndex: (i: number | null) => void;
  /** Used in the arrow labels: "Previous project", "Next image"… */
  noun?: string;
}) {
  const startX = useRef<number | null>(null);
  const item = index === null ? null : items[index];
  const go = (d: number) => index !== null && onIndex((index + d + items.length) % items.length);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }
  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
  };

  const navBtn =
    "grid size-12 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10";

  return (
    <Dialog.Root open={item !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <Dialog.Portal>
        <Dialog.Popup
          data-theme="dark"
          onKeyDown={onKeyDown}
          className={cn(
            "fixed inset-0 z-[70] flex flex-col bg-night text-white",
            "transition-opacity duration-300 ease-arch data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
          )}
        >
          {item && index !== null && (
            <>
              <div className="flex h-16 shrink-0 items-center justify-between px-(--pad)">
                <p className="text-base text-mist tabular-nums">
                  {index + 1} / {items.length}
                </p>
                <Dialog.Close aria-label="Close" className={navBtn}>
                  <X aria-hidden strokeWidth={1.5} className="size-5" />
                </Dialog.Close>
              </div>

              <div className="flex min-h-0 flex-1 items-center gap-4 px-(--pad)">
                <button type="button" onClick={() => go(-1)} aria-label={`Previous ${noun}`} className={cn(navBtn, "max-md:hidden")}>
                  <ArrowLeft aria-hidden strokeWidth={1.5} className="size-5" />
                </button>
                <div
                  className="relative size-full touch-pan-y select-none"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerCancel={() => (startX.current = null)}
                >
                  <Image key={item.key} src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" draggable={false} />
                </div>
                <button type="button" onClick={() => go(1)} aria-label={`Next ${noun}`} className={cn(navBtn, "max-md:hidden")}>
                  <ArrowRight aria-hidden strokeWidth={1.5} className="size-5" />
                </button>
              </div>

              <div className="flex shrink-0 items-end justify-between gap-4 px-(--pad) pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div className="flex min-w-0 flex-col gap-1.5">
                  {item.label && <span className="type-chip text-gold">{item.label}</span>}
                  <Dialog.Title className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight font-medium tracking-[-0.015em]">
                    {item.title}
                  </Dialog.Title>
                  {item.meta && (
                    <Dialog.Description render={<div />} className="flex flex-wrap items-center gap-3 text-base text-mist">
                      {item.meta}
                    </Dialog.Description>
                  )}
                </div>
                {/* Mobile: arrows under the image (swipe also works) */}
                <div className="flex gap-2 md:hidden">
                  <button type="button" onClick={() => go(-1)} aria-label={`Previous ${noun}`} className={navBtn}>
                    <ArrowLeft aria-hidden strokeWidth={1.5} className="size-5" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label={`Next ${noun}`} className={navBtn}>
                    <ArrowRight aria-hidden strokeWidth={1.5} className="size-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
