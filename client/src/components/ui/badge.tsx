import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./button"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-sage-tint text-primary hover:bg-[#d8e3dc]",
        selected: "bg-primary text-canvas",
        match: "bg-surface-cream text-ink-primary font-bold border border-hairline",
        accent: "bg-tertiary-accent text-white",
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
      {variant === 'match' && matchPercentage !== undefined && (
        <span className="w-2 h-2 rounded-full bg-tertiary-accent mr-1.5 animate-pulse" />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
