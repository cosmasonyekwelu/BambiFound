import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-label-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary-container text-on-primary hover:bg-primary shadow-sm",
        secondary:
          "bg-surface-container-lowest text-on-surface border border-outline-variant/60 hover:bg-surface-container-low shadow-sm",
        accent: "bg-tertiary-accent text-on-primary hover:opacity-95 shadow-sm",
        ghost: "hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface",
        outline: "border border-outline-variant text-on-surface hover:bg-surface-container-low",
        link: "text-secondary underline decoration-secondary/40 underline-offset-4 hover:text-primary",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-8 px-3.5 text-label-sm",
        lg: "h-12 px-7 text-headline-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
