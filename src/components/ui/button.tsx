import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          primary:
            "bg-blue-600 dark:bg-blue-500/50 text-blue-50 dark:text-white shadow-sm hover:bg-blue-400 dark:hover:bg-blue-600",
          info:
            "bg-cyan-600 dark:bg-cyan-500/50 text-cyan-50 dark:text-white shadow-sm hover:bg-cyan-400 dark:hover:bg-cyan-600",
          secondary:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          warning:
            "bg-orange-500 dark:bg-orange-400 text-primary-foreground shadow hover:bg-orange-300 hover:dark:bg-orange-300",
          success:
            "bg-emerald-500 dark:bg-emerald-400/70 dark:text-emerald-50 text-primary-foreground shadow hover:bg-emerald-300 hover:dark:bg-emerald-400/80",
          danger:
            "bg-red-600 text-destructive-foreground shadow-sm dark:bg-red-500 hover:bg-red-500/90 hover:dark:bg-red-400",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
