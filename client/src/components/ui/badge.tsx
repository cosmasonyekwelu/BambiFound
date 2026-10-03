import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./button"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 font-label-sm text-label-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-sage-tint text-primary-container hover:bg-secondary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        selected: "bg-primary-container text-on-primary",
        match: "bg-surface-container-low text-on-surface font-semibold border border-outline-variant/60 shadow-sm",
        accent: "bg-tertiary-accent text-on-primary",
        outline: "border border-outline-variant text-on-surface-variant",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  matchPercentage?: number;
}

function Badge({ className, variant, matchPercentage, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === 'match' && (
        <span className="w-1.5 h-1.5 rounded-full bg-tertiary-accent mr-1.5 animate-pulse" />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
