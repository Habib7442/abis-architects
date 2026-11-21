import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * DESIGN.md §7.1. Heights are 48px on mobile and 52px from md up; radius 2px.
 * Use `buttonVariants` on <Link> / <a> for navigational buttons.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-sm border border-transparent font-sans text-sm font-bold tracking-[0.02em] whitespace-nowrap transition-[transform,background-color,border-color,color] duration-300 ease-arch outline-none select-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-gold text-ink hover:bg-[color-mix(in_oklab,var(--gold),white_10%)]",
        secondary: "border-ink text-ink hover:bg-ink hover:text-paper",
        "secondary-dark": "border-white/30 text-white hover:border-white",
        dark: "bg-ink text-paper hover:bg-ink-3",
        whatsapp: "bg-whatsapp text-ink hover:bg-[color-mix(in_oklab,var(--whatsapp),white_10%)]",
        pill: "rounded-full border-ink/15 bg-white text-ink hover:border-ink/40",
        "pill-dark": "rounded-full bg-ink text-white hover:bg-ink-3",
        link: "h-auto px-0 text-gold-text hover:translate-y-0 hover:underline underline-offset-4",
      },
      size: {
        default: "h-12 px-[26px] md:h-[52px]",
        sm: "h-11 px-5",
        pill: "h-12 px-6",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
