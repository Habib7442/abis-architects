/**
 * Server-safe part of the page mode (prompts/003): imported by app/layout.tsx.
 * The client hook and setters live in lib/theme.ts.
 */
export const THEME_STORAGE_KEY = "abis-theme";

/**
 * Runs in <head> before first paint, so there is no flash. Kept dependency-free and ES5.
 * Default is light (the user's choice): only a saved "dark" switches it.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}d.setAttribute("data-mode",t==="dark"?"dark":"light")})()`;
