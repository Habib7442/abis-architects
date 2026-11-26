import type { SVGProps } from "react";

/**
 * Line versions of the social brand marks (lucide-react v1 no longer ships brand icons).
 * 24px grid, 1.5px stroke, round caps: same style as the rest of the icon set (DESIGN §9).
 */
const base = (props: SVGProps<SVGSVGElement>) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 10.5V17M8 7.5v.01M11.5 17v-6.5M11.5 13.2c0-1.6 1.1-2.7 2.5-2.7s2.5 1 2.5 2.7V17" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 20l1.2-3.6A8.5 8.5 0 1 1 8.4 19.5z" />
      <path d="M9.2 8.4c.3-.6.7-.6 1-.6h.4c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.1.7l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3 0 .7-.6 1-.8.5-2 .5-3.6-.4a9.3 9.3 0 0 1-3.4-3.4c-.9-1.6-.9-2.8-.4-3.6z" />
    </svg>
  );
}
