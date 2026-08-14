import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-950 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-300",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-zinc-400",
        outline:
          "border border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-500 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-400",
        ghost:
          "bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-400",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:focus-visible:ring-red-600",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 py-2 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
