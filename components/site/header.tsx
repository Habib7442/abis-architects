"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ThemeSwitchRow, ThemeToggle } from "@/components/site/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 30;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 ease-arch",
        "data-scrolled:border-line data-scrolled:bg-paper/85 data-scrolled:backdrop-blur-[14px]",
      )}
    >
      <div className="mx-auto grid h-full max-w-[1320px] grid-cols-[1fr_auto] items-center gap-6 px-(--pad) lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-3.5 text-[15px] font-semibold text-ink/70 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          {/* Desktop: left of "Get in touch". Mobile: next to the menu button. */}
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "pill", size: "sm" }), "hidden lg:inline-flex")}
          >
            <Phone aria-hidden strokeWidth={1.5} />
            Get in touch
          </Link>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex size-12 items-center justify-center rounded-sm text-ink lg:hidden"
            >
              <Menu aria-hidden strokeWidth={1.5} className="size-6" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Popup
                className={cn(
                  "fixed inset-0 z-[60] flex flex-col bg-paper",
                  "transition-[opacity,transform] duration-300 ease-arch",
                  "data-starting-style:-translate-y-2 data-starting-style:opacity-0",
                  "data-ending-style:-translate-y-2 data-ending-style:opacity-0",
                  "motion-reduce:transition-none",
                )}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-line px-(--pad)">
                  <Logo />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-12 items-center justify-center rounded-sm text-ink"
                  >
                    <X aria-hidden strokeWidth={1.5} className="size-6" />
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="scrollbar-none flex-1 overflow-y-auto px-(--pad) pt-6">
                  <ul>
                    {mainNav.map((item) => (
                      <li key={item.href} className="border-b border-line">
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-16 items-center font-display text-[32px] leading-none font-medium tracking-[-0.025em] text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="border-b border-line">
                      <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="flex min-h-16 items-center font-display text-[32px] leading-none font-medium tracking-[-0.025em] text-ink"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                  <ThemeSwitchRow className="border-b border-line" />
                </nav>

                <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-line px-(--pad) pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <a href={site.phoneHref} className={buttonVariants({ variant: "secondary" })}>
                    <Phone aria-hidden strokeWidth={1.5} />
                    Call
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "whatsapp" })}
                  >
                    <MessageCircle aria-hidden strokeWidth={1.5} />
                    WhatsApp
                  </a>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
