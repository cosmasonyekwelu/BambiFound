import * as React from "react"
import { cn } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-[#E5DFD5] bg-surface px-3 py-3 text-sm text-ink-primary shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ink-muted focus-visible:outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-[rgba(45,90,64,0.12)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
