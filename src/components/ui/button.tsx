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
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        primary:
          "bg-blue-500 text-blue-50 shadow hover:bg-blue-600",
        success:
          "bg-emerald-500 text-emerald-50 shadow hover:bg-emerald-600",
        warning:
          "bg-amber-500 text-amber-50 shadow hover:bg-amber-600",
        danger:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "outline--primary":
          "border-2 border-blue-500 text-blue-700 bg-transparent hover:bg-blue-500 hover:text-blue-50",
        "outline--success":
          "border-2 border-emerald-500 text-emerald-700 bg-transparent hover:bg-emerald-500 hover:text-emerald-50",
        "outline--warning":
          "border-2 border-amber-500 text-amber-700 bg-transparent hover:bg-amber-500 hover:text-amber-50",
        "outline--danger":
          "border-2 border-red-500 text-red-700 bg-transparent hover:bg-red-500 hover:text-red-50",
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
