"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

/**
 * Light/dark page mode (prompts/003). The mode lives on <html data-mode="light|dark">.
 * `data-theme` is a different thing: the per-section dark band switch (DESIGN §14).
 *
 * - No saved choice: follow the system, live.
 * - A saved choice (localStorage) wins until storage is cleared.
 */
export type ThemeMode = "light" | "dark";

const SWITCH_CLASS = "theme-switching";
const SWITCH_MS = 200;
const CHANGE_EVENT = "abis-theme-change";

function readStored(): ThemeMode | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

const systemQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/** The mode the page should be in right now: saved choice, else system. */
export function resolveThemeMode(): ThemeMode {
  return readStored() ?? (systemQuery().matches ? "dark" : "light");
}

/** Put the resolved mode on <html>. Also used after React's dev remount clears the attribute. */
export function applyThemeMode(mode: ThemeMode = resolveThemeMode()) {
  document.documentElement.setAttribute("data-mode", mode);
}

let switchTimer: number | undefined;

/** Save and apply a choice, with a short colour fade (skipped under reduced motion). */
export function setThemeMode(mode: ThemeMode) {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    root.classList.add(SWITCH_CLASS);
    window.clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => root.classList.remove(SWITCH_CLASS), SWITCH_MS + 50);
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage blocked (private mode etc.): the switch still works for this page view.
  }
  applyThemeMode(mode);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const mq = systemQuery();
  const onSystem = () => {
    // Only follow the system while the user hasn't chosen.
    if (!readStored()) applyThemeMode();
    onChange();
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY && e.key !== null) return;
    applyThemeMode(); // another tab switched
    onChange();
  };
  mq.addEventListener("change", onSystem);
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    mq.removeEventListener("change", onSystem);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

const getSnapshot = (): ThemeMode =>
  document.documentElement.getAttribute("data-mode") === "dark" ? "dark" : "light";

/** Unknown on the server and during hydration, so callers render a placeholder first. */
const getServerSnapshot = (): ThemeMode | null => null;

/** The current mode, or null until mounted (avoids a hydration mismatch). */
export function useThemeMode(): ThemeMode | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
