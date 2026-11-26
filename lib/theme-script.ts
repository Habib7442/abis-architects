/**
 * Server-safe part of the page mode (prompts/003): imported by app/layout.tsx.
 * The client hook and setters live in lib/theme.ts.
 */
export const THEME_STORAGE_KEY = "abis-theme";

/**
 * Runs in <head> before first paint, so there is no flash. Kept dependency-free and ES5.
 * The system check is outside the try, so a blocked localStorage still follows the system.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-mode",t)})()`;
